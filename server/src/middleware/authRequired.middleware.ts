import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "dotenv";

config();

interface AuthenticateRequest extends Request {
  user?: JwtPayload | string;
  token?: string;
}

export const authRequired = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  console.log(token);
  const secret = process.env.SECRET_KEY;

  if (!token)
    return res
      .status(403)
      .json({ message: "Token de autenticación no proporcionado" });

  if (!secret) {
    return res.status(500).json({
      message: "SECRET_KEY no está definida en las variables de entorno",
    });
  }

  jwt.verify(
    token,
    secret,
    (error: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          return res
            .status(403)
            .json({ message: "Token de autenticación inválido" });
        }
        if (error.name === "TokenExpiredError") {
          return res.status(403).json({
            message: "Autenticación expirada, vuelve a iniciar sesión",
          });
        }
        return res
          .status(403)
          .json({ message: "Error verificando token de autenticación" });
      }

      if (
        typeof decoded !== "string" &&
        decoded &&
        decoded.user === "usuario_medico"
      ) {
        req.user = decoded;
        req.token = token;
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Acceso denegado: solo permitido para médicos" });
      }
    }
  );
};

export const authReceptionistRequired = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  const secret = process.env.SECRET_KEY;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Token de autenticación no proporcionado" });
  }

  if (!secret) {
    return res.status(500).json({
      message: "SECRET_KEY no está definida en las variables de entorno",
    });
  }

  jwt.verify(
    token,
    secret,
    (error: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          return res
            .status(403)
            .json({ message: "Token de autenticación inválido" });
        }
        if (error.name === "TokenExpiredError") {
          return res.status(403).json({
            message: "Autenticación expirada, vuelve a iniciar sesión",
          });
        }
        return res
          .status(403)
          .json({ message: "Error verificando token de autenticación" });
      }
      if (
        typeof decoded !== "string" &&
        decoded &&
        decoded.user === "usuario_recepcionista"
      ) {
        req.user = decoded;
        req.token = token;
        next();
      } else {
        return res.status(403).json({
          message: "Acceso denegado: solo permitido para recepcionistas",
        });
      }
    }
  );
};
