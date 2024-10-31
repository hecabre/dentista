import { Request, Response } from "express";
import {
  INSERT_PROCEDURE_DATE_SQL,
  UPDATE_PROCEDURE_DATE_SQL,
  SELECT_ALL_PROCEDURE_DATES_SQL,
  SELECT_PROCEDURE_DATE_BY_EMPLEADO_SQL,
} from "../query/procedureDate.query";
import { CreateProcedureDateBodyType } from "../schemas/procedureDate.schema";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";
import { SelectParamsType } from "../schemas/select.schema";

/**
 * Crea una nueva fecha de procedimiento a partir de la información proporcionada en el cuerpo de la solicitud.
 *
 * @param {Request<unknown, unknown, CreateProcedureDateBodyType>} req - El objeto de solicitud que contiene los datos del procedimiento.
 * @param {Response} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Response>} Respuesta JSON con el resultado de la creación.
 */
export const createProcedureDate = async (
  req: Request<unknown, unknown, CreateProcedureDateBodyType>,
  res: Response
) => {
  try {
    const procedureDate = await insertUpdateQuery(INSERT_PROCEDURE_DATE_SQL, [
      req.body.cita_empleado_numss,
      req.body.fecha,
      req.body.hora,
      req.body.cod_procedimiento,
    ]);
    if (procedureDate.affectedRows === 0)
      return res.status(400).json({
        message:
          "Error al crear el el procedimiento de la cita. Verifica que los datos sean correctos.",
        error:
          "La inserción falló en la base de datos. Es posible que los datos sean inválidos o incompletos.",
      });
    return res
      .status(200)
      .json({ message: "Procedimiento de la cita creado con exito" });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Actualiza una fecha de procedimiento existente con los nuevos datos proporcionados en el cuerpo de la solicitud.
 *
 * @param {Request<unknown, unknown, CreateProcedureDateBodyType>} req - El objeto de solicitud que contiene los datos actualizados del procedimiento.
 * @param {Response} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Response>} Respuesta JSON con el resultado de la actualización.
 */
export const updateProcedureDate = async (
  req: Request<unknown, unknown, CreateProcedureDateBodyType>,
  res: Response
) => {
  try {
    const procedureDate = await insertUpdateQuery(UPDATE_PROCEDURE_DATE_SQL, [
      req.body.fecha,
      req.body.hora,
      req.body.cod_procedimiento,
      req.body.cita_empleado_numss,
      req.body.fecha,
      req.body.hora,
    ]);
    if (procedureDate.affectedRows === 0)
      return res.status(404).json({
        message:
          "No se ha encontrado al procedimiento de la cita que deseas actualizar",
      });
    return res
      .status(200)
      .json({ message: "Procedimiento de la cita actualizado con éxito" });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Selecciona las fechas de procedimiento asociadas a un empleado específico utilizando su número de seguridad social.
 *
 * @param {Request<SelectParamsType, unknown, unknown>} req - El objeto de solicitud que contiene los parámetros de búsqueda (número de seguridad social).
 * @param {Response} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Response>} Respuesta JSON con las fechas de procedimiento encontradas o un mensaje de error.
 */
export const selectProcedureDateByNumSS = async (
  req: Request<SelectParamsType, unknown, unknown>,
  res: Response
) => {
  try {
    const procedureDate = await selectQuery(
      SELECT_PROCEDURE_DATE_BY_EMPLEADO_SQL,
      [req.params.id]
    );
    if (procedureDate.length === 0)
      return res
        .status(404)
        .json({ message: "No se encontraron procedimiento por empleado" });
    return res.status(200).json({
      message: "Mostrando procedimientos",
      procedureDate: procedureDate,
    });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Selecciona todas las fechas de procedimiento disponibles.
 *
 * @param {Request} req - El objeto de solicitud.
 * @param {Response} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns {Promise<Response>} Respuesta JSON con todas las fechas de procedimiento encontradas o un mensaje de error.
 */
export const selectAllProcedureDate = async (req: Request, res: Response) => {
  try {
    const procedureDate = await selectQuery(SELECT_ALL_PROCEDURE_DATES_SQL, []);
    if (procedureDate.length === 0)
      return res
        .status(404)
        .json({ message: "No se encontraron procedimientoS de la cita" });
    return res.status(200).json({
      message: "Mostrando procedimientos de la cita",
      procedureDate: procedureDate,
    });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};
