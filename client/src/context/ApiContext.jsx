import { useContext, useState, createContext, useEffect } from "react";
import { createDateRequest, listDateRequest } from "../api/dates/date";
import {
  listPatientRequest,
  updatePatientRequest,
  createPatientRequest,
} from "../api/patient/patient";

export const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within a provider");
  return context;
};

export const ApiProvider = ({ children }) => {
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const createDate = async (date) => {
    try {
      const response = await createDateRequest(date);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const listDates = async () => {
    setIsLoading(true);
    try {
      const dates = await listPatientRequest();
      console.log(dates);
      setDates(dates.data.patient);
      return dates;
    } catch (error) {
      setErrors([error.response?.data?.message || "Error de autenticación."]);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePatient = async (patient) => {
    try {
      const response = await updatePatientRequest(patient);
      if (response.status === 200) {
        setSuccessMessage("Actualización realizada con éxito.");
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };

  const createPatient = async (patient) => {
    try {
      const response = await createPatientRequest(patient);
      if (response.status === 200) {
        setSuccessMessage("Paciente creado con éxito.");
        await listDates(); // Actualiza la lista de pacientes después de crear uno nuevo
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        createDate,
        listDates,
        updatePatient,
        createPatient, // Asegúrate de incluir createPatient en el contexto
        dates,
        isLoading,
        errors,
        successMessage,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
