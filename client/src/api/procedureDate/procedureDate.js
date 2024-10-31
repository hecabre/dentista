import axios from "../axios";

// Función para obtener todas las fechas de procedimientos
export const listProcedureDateRequest = async () => {
  return axios.get("/procedure-date/list");
};

// Función para obtener una fecha de procedimiento específica por número de seguro social
export const getProcedureDateByNumSSRequest = async (numSS) => {
  return axios.get(`/procedure-date/list/${numSS}`);
};

// Función para crear una nueva fecha de procedimiento
export const createProcedureDateRequest = async (procedureDate) => {
  return axios.post("/procedure-date/create", procedureDate);
};

// Función para actualizar una fecha de procedimiento existente
export const updateProcedureDateRequest = async (procedureDate) => {
  return axios.put("/procedure-date/update", procedureDate);
};
