import axios from "../axios";

export const listPatientRequest = async () => {
  return axios.get("/patient/list");
};

export const createPatientRequest = async (patient) => {
  return axios.post("/patient/create", patient);
};

export const updatePatientRequest = async (patient) => {
  return axios.put(`/patient/update/${patient.telefono}`, patient);
};
