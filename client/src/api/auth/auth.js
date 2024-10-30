import axios from "../axios";

export const loginDoctorRequest = async (user) =>
  axios.post("session/login/doctor", user);

export const loginReceptionistRequest = async (user) =>
  axios.post("session/login/receptionist", user);

export const verifyTokenRequest = async () => axios.get("/verify-token");
