import { Request, Response } from "express";
import { config } from "dotenv";
import { LoginBodyType } from "../schemas/session.schema";
import { createAccessToken } from "../utils/jwt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { LOGIN_SQL } from "../query/session.query";
import { selectUserQuery } from "../utils/crudQuerys";
import { loginDb } from "../utils/connectDb";

config();

export const loginDoctor = async (
  req: Request<unknown, unknown, LoginBodyType>,
  res: Response
) => {
  let connection;

  try {
    // Establecer la conexión utilizando la función loginDb
    connection = await loginDb(req.body.user, req.body.password);
    console.log("Conexión exitosa");

    // Generar el token de acceso
    const token = await createAccessToken({ user: req.body.user });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Iniciando sesión" });
  } catch (error) {
    return res.status(401).json({
      message: "Credenciales incorrectas",
      error: error.message,
    });
  } finally {
    // Cerrar la conexión si está abierta
    if (connection) {
      await connection.end();
    }
  }
};

/**
 * Maneja el inicio de sesión para un usuario recepcionista.
 *
 * @param req - Objeto de solicitud Express, contiene `user` y `password` en el cuerpo.
 * @param res - Objeto de respuesta Express.
 * @returns Responde con el estado de la autenticación y un token de acceso si las credenciales son correctas.
 */
export const loginReceptionist = async (
  req: Request<unknown, unknown, LoginBodyType>,
  res: Response
) => {
  try {
    if (
      req.body.user !== process.env.RECEPCIONISTA ||
      req.body.password !== process.env.RECEPCIONISTA_PASSWORD
    )
      return res.status(401).json({ message: "Credenciales incorrectas" });
    const token = await createAccessToken({ user: req.body.user });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "Iniciando sesión", user: req.body.user });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: error.message,
    });
  }
};

/**
 * Cierra la sesión del usuario eliminando la cookie del token de autenticación.
 *
 * @param req - Objeto de solicitud Express.
 * @param res - Objeto de respuesta Express.
 * @returns Responde con un mensaje de confirmación de cierre de sesión.
 */
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 0,
    });

    return res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: error.message,
    });
  }
};

/**
 * Verifica la validez del token de autenticación y autoriza el acceso basado en el rol del usuario.
 *
 * @param req - Objeto de solicitud Express, contiene el token en las cookies.
 * @param res - Objeto de respuesta Express.
 * @returns Responde con el estado de autenticación basado en el rol del usuario.
 */
export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const secret = process.env.SECRET_KEY;

    // Validaciones iniciales
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token de autenticación no proporcionado" });
    }
    if (!secret) {
      return res.status(500).json({
        message: "SECRET_KEY no está definida en las variables de entorno",
      });
    }

    // Verificación del token
    jwt.verify(
      token,
      secret,
      (
        error: VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (error) {
          const errorMessage =
            error.name === "TokenExpiredError"
              ? "Autenticación expirada, vuelve a iniciar sesión"
              : "Token de autenticación inválido";
          return res.status(401).json({ message: errorMessage });
        }

        if (typeof decoded === "string" || !decoded) {
          return res.status(403).json({
            message: "Token de autenticación inválido o faltan permisos",
          });
        }

        // Mapeo de roles de usuario a respuestas
        const roles = {
          [process.env.MEDICO]: {
            status: 200,
            message: "Acceso permitido para médico",
          },
          [process.env.RECEPCIONISTA]: {
            status: 200,
            message: "Acceso permitido para recepcionista",
          },
        };

        // Respuesta basada en el rol del usuario
        const userRole = decoded.user;
        const roleResponse = roles[userRole];

        if (roleResponse) {
          return res.status(roleResponse.status).json({
            message: roleResponse.message,
            user: userRole,
          });
        } else {
          return res.status(403).json({
            message: "Acceso denegado: usuario no autorizado",
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: error.message,
    });
  }
};
