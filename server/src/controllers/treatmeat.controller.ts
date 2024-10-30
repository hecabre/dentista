import { Request, Response } from "express";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";
import {
  CreateTreatmentBodyType,
  UpdateTreatmentBodyType,
  UpdateTreatmentParamsType,
} from "../schemas/treatmient.schema";
import { SelectParamsType } from "../schemas/select.schema";
import {
  insertTratamientoSQL,
  updateTratamientoSQL,
  selectSuministroSQL,
} from "../query/treatments.query";

/**
 * Crea un nuevo tratamiento médico en la base de datos.
 *
 * @async
 * @function createTreatment
 * @param {Request<unknown, unknown, CreateTreatmentBodyType>} req - Solicitud de Express que contiene en el cuerpo:
 *   - fecha: Fecha del tratamiento.
 *   - pacientes_telefono: Teléfono del paciente.
 *   - procedimiento: Procedimiento realizado.
 *   - observaciones: Observaciones del tratamiento.
 *   - medicamentoRecetado: Medicamentos recetados.
 *   - citasFaltante: Información sobre citas faltantes.
 * @param {Response} res - Respuesta de Express para enviar el resultado de la operación.
 * @returns {Promise<void>} - Retorna una respuesta JSON con el resultado de la creación o un mensaje de error.
 */
export const createTreatment = async (
  req: Request<unknown, unknown, CreateTreatmentBodyType>,
  res: Response
) => {
  try {
    const treatment = await insertUpdateQuery(insertTratamientoSQL, [
      req.body.fecha,
      req.body.pacientes_telefono,
      req.body.procedimiento,
      req.body.observaciones,
      req.body.medicamentoRecetado,
      req.body.citasFaltante,
    ]);
    if (treatment.affectedRows === 0)
      return res.status(400).json({
        message:
          "Error al crear el tratamiento. Verifica que los datos sean correctos.",
        error:
          "La inserción falló en la base de datos. Es posible que los datos sean inválidos o incompletos.",
      });
    return res.status(200).json({ message: "Tratamiento creado con éxito" });
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
 * Actualiza un tratamiento médico existente en la base de datos.
 *
 * @async
 * @function updateTreatment
 * @param {Request<UpdateTreatmentParamsType, unknown, UpdateTreatmentBodyType>} req - Solicitud de Express con:
 *   - `params.fecha`: Fecha del tratamiento (en los parámetros de la URL).
 *   - `params.pacientes_telefono`: Teléfono del paciente (en los parámetros de la URL).
 *   - `body.procedimiento`: Procedimiento realizado.
 *   - `body.observaciones`: Observaciones del tratamiento.
 *   - `body.medicamentoRecetado`: Medicamentos recetados.
 *   - `body.citasFaltante`: Información sobre citas faltantes.
 * @param {Response} res - Respuesta de Express para enviar el resultado de la operación.
 * @returns {Promise<void>} - Retorna una respuesta JSON con el resultado de la actualización o un mensaje de error.
 */
export const updateTreatment = async (
  req: Request<UpdateTreatmentParamsType, unknown, UpdateTreatmentBodyType>,
  res: Response
) => {
  try {
    const treatment = await insertUpdateQuery(updateTratamientoSQL, [
      req.body.procedimiento,
      req.body.observaciones,
      req.body.medicamentoRecetado,
      req.body.citasFaltante,
      req.params.fecha,
      req.params.pacientes_telefono,
    ]);
    if (treatment.affectedRows === 0)
      return res.status(404).json({
        message: "No se ha encontrado el tratamiento que deseas actualizar",
      });
    return res
      .status(200)
      .json({ message: "Tratamiento actualizado con éxito" });
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
 * Selecciona todos los tratamientos médicos almacenados en la base de datos.
 *
 * @async
 * @function selectTreatment
 * @param {Request} req - Solicitud de Express.
 * @param {Response} res - Respuesta de Express que envía la lista de tratamientos o un mensaje de error.
 * @returns {Promise<void>} - Retorna una respuesta JSON con los tratamientos o un mensaje de error.
 */
export const selectTreatment = async (req: Request, res: Response) => {
  try {
    const treatment = await selectQuery(selectSuministroSQL, []);
    if (treatment.length === 0)
      return res
        .status(404)
        .json({ message: "No se han encontrado tratamientos" });
    return res
      .status(200)
      .json({ message: "Mostrando tratamientos", treatment: treatment });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};
