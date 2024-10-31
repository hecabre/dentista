import { Request, Response } from "express";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";
import {
  insertSuministroSQL,
  updateSuministroSQL,
  selectSuministroSQL,
} from "../query/supply.query";
import {
  CreateSupplyBodyType,
  UpdateSupplyBodyType,
  UpdateSupplyParamsType,
} from "../schemas/supply.schema";

/**
 * Crea un nuevo suministro en la base de datos.
 *
 * @async
 * @function createSupply
 * @param {Request<unknown, unknown, CreateSupplyBodyType>} req - Solicitud de Express que contiene en el cuerpo:
 *   - nombre: Nombre del suministro.
 *   - cantidad: Cantidad del suministro.
 *   - caducidad: Fecha de caducidad del suministro.
 *   - estado: Estado del suministro (vigente o no).
 *   - id_suminsitro: ID del suministro.
 *   - vigente: Booleano indicando si el suministro está vigente.
 * @param {Response} res - Respuesta de Express para enviar el resultado de la operación.
 * @returns {Promise<void>} - Retorna una respuesta JSON con el resultado de la creación o un mensaje de error.
 */
export const createSupply = async (
  req: Request<unknown, unknown, CreateSupplyBodyType>,
  res: Response
) => {
  try {
    const supply = await insertUpdateQuery(insertSuministroSQL, [
      req.body.nombre,
      req.body.cantidad,
      req.body.caducidad,
      req.body.estado,
      req.body.id_suministro,
      req.body.vigente,
    ]);
    if (supply.affectedRows === 0)
      return res.status(400).json({
        message:
          "Error al crear el suministro. Verifica que los datos sean correctos.",
        error:
          "La inserción falló en la base de datos. Es posible que los datos sean inválidos o incompletos.",
      });
    return res.status(200).json({ message: "Suministro creado con éxito" });
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
 * Actualiza un suministro existente en la base de datos.
 *
 * @async
 * @function updateSupply
 * @param {Request<UpdateSupplyParamsType, unknown, UpdateSupplyBodyType>} req - Solicitud de Express que contiene en el cuerpo:
 *   - nombre: Nombre del suministro.
 *   - caducidad: Fecha de caducidad del suministro.
 *   - estado: Estado del suministro (vigente o no).
 *   - vigente: Booleano indicando si el suministro está vigente.
 *   - id_suminsitro: ID del suministro (en los parámetros de la URL).
 * @param {Response} res - Respuesta de Express para enviar el resultado de la operación.
 * @returns {Promise<void>} - Retorna una respuesta JSON con el resultado de la actualización o un mensaje de error.
 */
export const updateSupply = async (
  req: Request<UpdateSupplyParamsType, unknown, UpdateSupplyBodyType>,
  res: Response
) => {
  console.log(req.body)
  try {
    const supply = await insertUpdateQuery(updateSuministroSQL, [
      req.body.nombre,
      req.body.cantidad,
      req.body.caducidad,
      req.body.estado,
      req.body.vigente,
      req.params.id_suministro,
    ]);
    if (supply.affectedRows === 0)
      return res.status(404).json({
        message: "No se ha encontrado el suministro que deseas actualizar",
      });
    return res
      .status(200)
      .json({ message: "Suministro actualizado con éxito" });
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
 * Selecciona todos los suministros almacenados en la base de datos.
 *
 * @async
 * @function selectAllSupply
 * @param {Request} req - Solicitud de Express.
 * @param {Response} res - Respuesta de Express que envía la lista de suministros o un mensaje de error.
 * @returns {Promise<void>} - Retorna una respuesta JSON con los suministros o un mensaje de error.
 */
export const selectAllSupply = async (req: Request, res: Response) => {
  try {
    const supply = await selectQuery(selectSuministroSQL, []);
    if (supply.length === 0)
      return res
        .status(404)
        .json({ message: "No se han encontrado suministros" });
    return res
      .status(200)
      .json({ message: "Mostrando suministros", supply: supply });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};
