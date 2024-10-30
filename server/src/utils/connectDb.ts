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
