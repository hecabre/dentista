import { Request, Response } from "express";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";
import {
  CreateDateBodyType,
  UpdateDateBodyType,
  UpdateDateParamsType,
} from "../schemas/date.schema";
import { SelectParamsType } from "../schemas/select.schema";
import {
  insertCitaSQL,
  updateCitaSQL,
  selectCitaByEmpleadoSQL,
  selectCitaSQL,
} from "../query/date.query";

/**
 * Crea una nueva cita en la base de datos.
 *
 * @param {Request<unknown, unknown, CreateDateBodyType>} req - La solicitud HTTP que contiene los detalles de la cita en el cuerpo.
 * @param {Response} res - La respuesta HTTP que será enviada al cliente.
 *
 * @returns {Promise<Response>} - Retorna una respuesta JSON indicando si la cita fue creada o no.
 *
 * @throws {Error} - Si ocurre un error durante la inserción, se retorna una respuesta 500 con detalles del error.
 */
export const createDate = async (
  req: Request<unknown, unknown, CreateDateBodyType>,
  res: Response
) => {
  try {
    const date = await insertUpdateQuery(insertCitaSQL, [
      req.body.empleado_numss,
      req.body.telefono,
      req.body.fecha,
      req.body.hora,
      req.body.estado,
      req.body.ano_cita,
      req.body.num_cita,
    ]);

    if (date.affectedRows === 0)
      return res.status(400).json({
        message: "No se ha podido crear la cita.",
        error:
          "La inserción falló en la base de datos. Verifica que los datos sean válidos y completos.",
      });

    return res.status(200).json({ message: "Cita creada con éxito" });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Actualiza una cita existente en la base de datos.
 *
 * @param {Request<UpdateDateParamsType, unknown, UpdateDateBodyType>} req - La solicitud HTTP que contiene el número de seguridad social en los parámetros y los nuevos detalles de la cita en el cuerpo.
 * @param {Response} res - La respuesta HTTP que será enviada al cliente.
 *
 * @returns {Promise<Response>} - Retorna una respuesta JSON indicando si la cita fue actualizada o no.
 *
 * @throws {Error} - Si ocurre un error durante la actualización, se retorna una respuesta 500 con detalles del error.
 */
export const updateDate = async (
  req: Request<UpdateDateParamsType, unknown, UpdateDateBodyType>,
  res: Response
) => {
  try {
    const date = await insertUpdateQuery(updateCitaSQL, [
      req.body.telefono,
      req.body.estado,
      req.body.ano_cita,
      req.body.num_cita,
      req.params.empleado_numss,
      req.body.fecha,
      req.body.hora,
    ]);

    if (date.affectedRows === 0)
      return res.status(404).json({
        message: "No se ha encontrado la cita.",
        error: `No existe una cita con el número de seguridad social ${req.params.empleado_numss}.`,
      });

    return res.status(200).json({ message: "Cita actualizada con éxito" });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Obtiene todas las citas de la base de datos.
 *
 * @param {Request} req - La solicitud HTTP sin parámetros ni cuerpo.
 * @param {Response} res - La respuesta HTTP que será enviada al cliente.
 *
 * @returns {Promise<Response>} - Retorna una respuesta JSON con todas las citas o un mensaje de error si no hay citas.
 *
 * @throws {Error} - Si ocurre un error durante la consulta, se retorna una respuesta 500 con detalles del error.
 */
export const selectAllDates = async (req: Request, res: Response) => {
  try {
    const dates = await selectQuery(selectCitaSQL, []);

    if (dates.length === 0)
      return res.status(404).json({
        message: "No se han encontrado citas.",
        error: "La base de datos no contiene ninguna cita registrada.",
      });

    return res.status(200).json({ message: "Mostrando citas", dates: dates });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};

/**
 * Obtiene las citas asociadas a un número de seguridad social específico.
 *
 * @param {Request<SelectParamsType, unknown, unknown>} req - La solicitud HTTP que contiene el número de seguridad social en los parámetros.
 * @param {Response} res - La respuesta HTTP que será enviada al cliente.
 *
 * @returns {Promise<Response>} - Retorna una respuesta JSON con las citas encontradas o un mensaje de error si no se encontraron citas.
 *
 * @throws {Error} - Si ocurre un error durante la consulta, se retorna una respuesta 500 con detalles del error.
 */
export const selectDateByNumSS = async (
  req: Request<SelectParamsType>,
  res: Response
) => {
  try {
    console.log(selectCitaByEmpleadoSQL);
    const dates = await selectQuery(selectCitaByEmpleadoSQL, [req.params.id]);
    if (dates.length === 0)
      return res
        .status(404)
        .json({ message: "No se ha encontrado la cita por empleado" });
    return res.status(200).json({ message: "Mostrando citas", dates: dates });
  } catch (err) {
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};
