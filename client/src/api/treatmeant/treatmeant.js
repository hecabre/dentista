import axios from "../axios";

export const listtreatmeantRequest = async () => {
  return axios.get("/treatmeant/list");
};

export const createTreatmeantRequest = async (treatmeant) => {
  return axios.post("/treatmeant/create", treatmeant);
};

export const updateTreatmeantRequest = async (treatmeant) => {
  return axios.put(
    `/treatmeant/update/${treatmeant.fecha}/${treatmeant.pacientes_telefono}`,
    treatmeant
  );
};
