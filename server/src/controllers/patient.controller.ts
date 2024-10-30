import { Request, Response } from "express";
import { SelectParamsType } from "../schemas/select.schema";
import {
  CreatePatientBodyType,
  UpdatePatientBodyType,
  UpdatePatientParamsType,
} from "../schemas/patient.schema";
import {
  INSERT_PATIENT_SQL,
  UPDATE_PATIENT_SQL,
  SELECT_ALL_PATIENTS_SQL,
  SELECT_PATIENT_BY_TELEFONO_SQL,
} from "../query/patient.query";
import { insertUpdateQuery, selectQuery } from "../utils/crudQuerys";

/**
 * Controlador para crear un nuevo paciente en la base de datos.
 *
 * @param req - Solicitud HTTP que contiene el cuerpo con los datos del paciente a crear.
 * @param res - Respuesta HTTP que indica el resultado de la operación.
 *
 * @returns {Promise<Response>} - Devuelve un mensaje indicando si el paciente fue creado exitosamente
 * o si ocurrió un error.
 */
export const createPatient = async (
  req: Request<unknown, unknown, CreatePatientBodyType>,
  res: Response
) => {
  try {
    // Ejecuta la consulta de inserción para el paciente
    const patient = await insertUpdateQuery(INSERT_PATIENT_SQL, [
      req.body.nombre,
      req.body.apellidoPaterno,
      req.body.apellidoMaterno,
      req.body.fechaNacimiento,
      req.body.genero,
      req.body.telefono,
      req.body.dominio,
      req.body.rfcLetras,
      req.body.rfcNumeros,
    ]);

    // Verifica si el paciente no fue insertado (insertId es 0)
    if (patient.affectedRows === 0) {
      return res.status(400).json({
        message:
          "Error al crear el paciente. Verifica que los datos sean correctos.",
        error:
          "La inserción falló en la base de datos. Es posible que los datos sean inválidos o incompletos.",
      });
    }

    // Paciente creado con éxito
    return res.status(200).json({ message: "Paciente creado con éxito" });
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
 * Controlador para actualizar los datos de un paciente existente.
 *
 * @param req - Solicitud HTTP que contiene los parámetros y el cuerpo con los datos actualizados del paciente.
 * @param res - Respuesta HTTP que indica el resultado de la operación.
 *
 * @returns {Promise<Response>} - Devuelve un mensaje indicando si el paciente fue actualizado exitosamente
 * o si ocurrió un error.
 */
export const updatePatient = async (
  req: Request<UpdatePatientParamsType, unknown, UpdatePatientBodyType>,
  res: Response
) => {
  try {
    // Ejecuta la consulta de actualización para el paciente
    console.log(req.body)
    const patient = await insertUpdateQuery(UPDATE_PATIENT_SQL, [
      req.body.nombre,
      req.body.apellidoPaterno,
      req.body.apellidoMaterno,
      req.body.fechaNacimiento,
      req.body.genero,
      req.body.dominio,
      req.body.rfcletras,
      req.body.rfcnumeros,
      req.params.telefono,
    ]);

    // Verifica si el paciente no fue encontrado (affectedRows es 0)
    if (patient.affectedRows === 0)
      return res.status(404).json({
        message: "No se ha encontrado al paciente que deseas actualizar",
      });

    // Paciente actualizado con éxito
    return res.status(200).json({ message: "Paciente actualizado con exito" });
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
 * Controlador para seleccionar todos los pacientes registrados en la base de datos.
 *
 * @param req - Solicitud HTTP.
 * @param res - Respuesta HTTP que contiene la lista de pacientes encontrados.
 *
 * @returns {Promise<Response>} - Devuelve una lista de pacientes o un mensaje de error en caso de que no se encuentren registros.
 */
export const selectAllPatient = async (req: Request, res: Response) => {
  try {
    // Ejecuta la consulta para seleccionar todos los pacientes
    const patient = await selectQuery(SELECT_ALL_PATIENTS_SQL, []);

    // Verifica si no se encontraron pacientes
    if (patient.length === 0)
      return res
        .status(404)
        .json({ message: "No se han encontrado pacientes" });

    // Pacientes encontrados con éxito
    return res
      .status(200)
      .json({ message: "Mostrando pacientes", patient: patient });
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
 * Controlador para seleccionar un paciente utilizando el número de teléfono.
 *
 * @param req - Solicitud HTTP que contiene el número de teléfono del paciente como parámetro.
 * @param res - Respuesta HTTP que contiene los datos del paciente encontrado.
 *
 * @returns {Promise<Response>} - Devuelve los datos del paciente o un mensaje de error si no se encuentra.
 */
export const selectPatientByPhone = async (
  req: Request<SelectParamsType, unknown, unknown>,
  res: Response
) => {
  try {
    // Ejecuta la consulta para seleccionar el paciente por teléfono
    const patient = await selectQuery(SELECT_PATIENT_BY_TELEFONO_SQL, [
      req.params.id,
    ]);

    // Verifica si no se encontró ningún paciente con el número de teléfono
    if (patient.length === 0)
      return res
        .status(404)
        .json({ message: "No se han encontrado pacientes" });

    // Paciente encontrado con éxito
    return res
      .status(200)
      .json({ message: "Mostrando pacientes", patient: patient });
  } catch (error) {
    const err = error as Error;

    // Manejo del error 500 en caso de fallo del servidor
    return res.status(500).json({
      message: "Error interno en el servidor, intenta más tarde",
      error: err.message,
    });
  }
};
