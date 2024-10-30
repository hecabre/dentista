import { connectDb } from "./connectDb";
import { ResultSetHeader, RowDataPacket } from "mysql2";

/**
 * Inserta o actualiza datos en la base de datos utilizando una consulta SQL.
 *
 * @param {string} query - La consulta SQL que se ejecutará en la base de datos.
 * @param {any[]} values - Un arreglo de valores que se utilizarán para reemplazar los marcadores de posición en la consulta.
 * @returns {Promise<ResultSetHeader>} Un objeto que contiene información sobre el resultado de la consulta, como el número de filas afectadas.
 * @throws {Error} Si no se puede conectar a la base de datos o si ocurre un error durante la ejecución de la consulta.
 */
export const insertUpdateQuery = async (
  query: string,
  values: any[]
): Promise<ResultSetHeader> => {
  const connection = await connectDb();
  if (!connection) throw new Error("Connection to db is not allowed");
  console.log("Valores")
  console.log(values)
  try {
    const [result] = await connection.query<ResultSetHeader>(query, values);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error("Error al ejecutar la consulta en la base de datos");
  } finally {
    if (connection) await connection.end();
  }
};

/**
 * Selecciona datos de la base de datos utilizando una consulta SQL.
 *
 * @param {string} query - La consulta SQL que se ejecutará en la base de datos.
 * @param {any[]} values - Un arreglo de valores que se utilizarán para reemplazar los marcadores de posición en la consulta.
 * @returns {Promise<RowDataPacket[][]>} Un arreglo de arreglos que contiene las filas seleccionadas de la base de datos.
 * @throws {Error} Si no se puede conectar a la base de datos o si ocurre un error durante la ejecución de la consulta.
 */
export const selectQuery = async (
  query: string,
  values: any[]
): Promise<RowDataPacket[][]> => {
  const connection = await connectDb();
  if (!connection) throw new Error("Connection to db is not allowed");

  try {
    const [result] = await connection.query<RowDataPacket[][]>(query, values);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error("Error al ejecutar la consulta en la base de datos");
  } finally {
    if (connection) await connection.end();
  }
};
