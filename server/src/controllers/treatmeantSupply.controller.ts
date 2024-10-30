import { Request, Response } from "express";
import {
  INSERT_TREATMENT_SUPPLY_SQL,
  UPDATE_TREATMENT_SUPPLY_SQL,
  SELECT_ALL_TREATMENT_SUPPLIES_SQL,
} from "../query/treatmientSupply.query";
import { CreateTreatmentSupplyBodyType } from "../schemas/treatmientSupply.schema";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";

/**
 * Crea un nuevo suministro de tratamiento.
 *
 * @param {Request<unknown, unknown, CreateTreatmentSupplyBodyType>} req - La solicitud HTTP que contiene los datos del suministro de tratamiento a crear.
 * @param {Response} res - La respuesta HTTP que se enviará al cliente.
 * @returns {Promise<Response>} La respuesta con el estado y mensaje apropiado según el resultado de la operación.
 */
export const createTreatmeantSupply = async (
  req: Request<unknown, unknown, CreateTreatmentSupplyBodyType>,
  res: Response
) => {
  try {
    const treatmeantSupply = await insertUpdateQuery(
      INSERT_TREATMENT_SUPPLY_SQL,
      [
        req.body.cita_empleado_numss,
        req.body.cita_fecha,
        req.body.cita_hora,
        req.body.procedimiento_cod_procedimiento,
      ]
    );
    if (treatmeantSupply.affectedRows === 0)
      return res.status(400).json({
        message:
          "Error al crear el tratamiento suministro. Verifica que los datos sean correctos.",
        error:
          "La inserción falló en la base de datos. Es posible que los datos sean inválidos o incompletos.",
      });
    return res
      .status(200)
      .json({ message: "Tratamiento y suministro creados con éxito." });
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
 * Actualiza un suministro de tratamiento existente.
 *
 * @param {Request<unknown, unknown, CreateTreatmentSupplyBodyType>} req - La solicitud HTTP que contiene los datos actualizados del suministro de tratamiento.
 * @param {Response} res - La respuesta HTTP que se enviará al cliente.
 * @returns {Promise<Response>} La respuesta con el estado y mensaje apropiado según el resultado de la operación.
 */
export const updateTreatmeantSupply = async (
  req: Request<unknown, unknown, CreateTreatmentSupplyBodyType>,
  res: Response
) => {
  try {
    const treatmeantSupply = await insertUpdateQuery(
      UPDATE_TREATMENT_SUPPLY_SQL,
      [
        req.body.procedimiento_cod_procedimiento,
        req.body.cita_empleado_numss,
        req.body.cita_fecha,
        req.body.cita_fecha,
      ]
    );
    if (treatmeantSupply.affectedRows === 0)
      return res.status(404).json({
        message: "No se ha encontrado el tratamiento que deseas actualizar",
      });
    return res
      .status(200)
      .json({ message: "Tratamiento y suministro actualizados con éxito." });
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
 * Selecciona todos los suministros de tratamiento.
 *
 * @param {Request} req - La solicitud HTTP sin parámetros adicionales.
 * @param {Response} res - La respuesta HTTP que se enviará al cliente.
 * @returns {Promise<Response>} La respuesta con el estado y los suministros de tratamiento encontrados.
 */
export const selectAllTreatmeantSupply = async (
  req: Request,
  res: Response
) => {
  try {
    const treatmeantSupply = await selectQuery(
      SELECT_ALL_TREATMENT_SUPPLIES_SQL,
      []
    );
    if (treatmeantSupply.length === 0)
      return res.status(404).json({
        message: "No se han encontrado suministros en los tratamientos",
      });
    return res.status(200).json({
      message: "Mostrando los suministros de los tratamientos",
      treatmeantSupply,
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
