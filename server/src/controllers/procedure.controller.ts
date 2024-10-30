import { Request, Response } from "express";
import { SelectParamsType } from "../schemas/select.schema";
import {
  CreateProcedureBodyType,
  UpdateProcedureBodyType,
  UpdateProcedureParamsType,
} from "../schemas/procedure.schema";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";
import {
  insertProcedimientoSQL,
  updateProcedimientoSQL,
  selectProcedimientoSQL,
} from "../query/procedure.query";

/**
 * Crea un nuevo procedimiento médico en la base de datos.
 *
 * @async
 * @function createProcedure
 * @param {Request<unknown, unknown, CreateProcedureBodyType>} req - Solicitud de Express que contiene en el cuerpo:
 *   - monto: El costo del procedimiento.
 *   - procedimiento: El nombre o descripción del procedimiento.
 *   - cod_procedimiento: Código único del procedimiento.
 * @param {Response} res - Respuesta de Express para enviar el resultado de la operación.
 * @returns {Promise<void>} - Retorna una respuesta JSON con el resultado de la creación o un mensaje de error.
 */
export const createProcedure = async (
  req: Request<unknown, unknown, CreateProcedureBodyType>,
  res: Response
) => {
  try {
    const procedure = await insertUpdateQuery(insertProcedimientoSQL, [
      req.body.monto,
      req.body.procedimiento,
      req.body.cod_procedimiento,
    ]);
    if (procedure.affectedRows === 0) {
      return res.status(400).json({
        message:
          "Error al crear el procedimiento. Verifica que los datos sean correctos.",
        error:
          "La inserción falló en la base de datos. Es posible que los datos sean inválidos o incompletos.",
      });
    }
    return res.status(200).json({ message: "Paciente creado con éxito" });
  } catch (error) {
    const err = error as Error;

    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Actualiza un procedimiento médico existente en la base de datos.
 *
 * @async
 * @function updateProcedure
 * @param {Request<UpdateProcedureParamsType, unknown, UpdateProcedureBodyType>} req - Solicitud de Express con:
 *   - `params.cod_procedimiento`: Código único del procedimiento (en los parámetros de la URL).
 *   - `body.monto`: El costo del procedimiento.
 *   - `body.procedimiento`: El nombre o descripción del procedimiento.
 * @param {Response} res - Respuesta de Express para enviar el resultado de la operación.
 * @returns {Promise<void>} - Retorna una respuesta JSON con el resultado de la actualización o un mensaje de error.
 */
export const updateProcedure = async (
  req: Request<UpdateProcedureParamsType, unknown, UpdateProcedureBodyType>,
  res: Response
) => {
  try {
    const procedure = await insertUpdateQuery(updateProcedimientoSQL, [
      req.body.monto,
      req.body.procedimiento,
      req.params.cod_procedimiento,
    ]);
    if (procedure.affectedRows === 0)
      return res.status(404).json({
        message: "No se ha encontrado al procedimiento que deseas actualizar",
      });
    return res
      .status(200)
      .json({ message: "Procedimiento actualizado con éxito" });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Selecciona todos los procedimientos médicos almacenados en la base de datos.
 *
 * @async
 * @function selectAllProcedures
 * @param {Request} req - Solicitud de Express.
 * @param {Response} res - Respuesta de Express que envía la lista de procedimientos o un mensaje de error.
 * @returns {Promise<void>} - Retorna una respuesta JSON con los procedimientos o un mensaje de error.
 */
export const selectAllProcedures = async (req: Request, res: Response) => {
  try {
    const procedure = await selectQuery(selectProcedimientoSQL, []);
    if (procedure.length === 0)
      return res
        .status(404)
        .json({ message: "No se han encontrado procedimientos" });
    return res
      .status(200)
      .json({ message: "Mostrando procedimientos", procedure: procedure });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};
