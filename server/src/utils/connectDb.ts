import { createConnection, ConnectionOptions } from "mysql2/promise";
import { config } from "dotenv";

config();

const access: ConnectionOptions = {
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT),
  host: process.env.HOST,
};

export const connectDb = async () => {
  try {
    const connection = await createConnection(access);
    return connection;
  } catch (error) {
    throw error;
  }
};

export const loginDb = async (user: string, password: string) => {
  try {
    const accessLogin: ConnectionOptions = {
      user: user,
      database: process.env.DATABASE,
      password: password,
      port: Number(process.env.PORT),
      host: process.env.HOST,
    };
    const connection = await createConnection(accessLogin);
    return connection;
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el controlador
  }
};
