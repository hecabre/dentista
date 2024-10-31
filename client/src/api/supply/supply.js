import axios from "../axios";

export const listSupplyRequest = async () => {
  return axios.get("/supply/list");
};

export const createSupplyRequest = async (supply) => {
  return axios.post("/supply/create", supply);
};

export const updateSupplyRequest = async (supply) => {

  return axios.put(`/supply/update/${supply.id_suministro}`, supply);
};
