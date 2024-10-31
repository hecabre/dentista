import { useContext, useState, createContext, useEffect } from "react";
import { createDateRequest, listDateRequest } from "../api/dates/date";
import {
  listPatientRequest,
  updatePatientRequest,
  createPatientRequest,
} from "../api/patient/patient";
import {
  createSupplyRequest,
  updateSupplyRequest,
  listSupplyRequest,
} from "../api/supply/supply";
import {
  createProcedureDateRequest,
  listProcedureDateRequest,
  getProcedureDateByNumSSRequest,
  updateProcedureDateRequest,
} from "../api/procedureDate/procedureDate"; // Importar las funciones para fechas de procedimientos
import {
  createTreatmeantRequest,
  updateTreatmeantRequest,
  listtreatmeantRequest,
} from "../api/treatmeant/treatmeant";
export const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within a provider");
  return context;
};

export const ApiProvider = ({ children }) => {
  const [dates, setDates] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [supplies, setSupplies] = useState([]); // Estado para suministros
  const [procedureDates, setProcedureDates] = useState([]); // Estado para fechas de procedimientos
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

  // Funciones para manejar fechas
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

  // Funciones para manejar pacientes
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

  // Funciones para manejar suministros
  const listSupplies = async () => {
    setIsLoading(true);
    try {
      const response = await listSupplyRequest();
      setSupplies(response.data.supply); // Asegúrate de que la estructura de datos sea correcta
      return response;
    } catch (error) {
      setErrors([
        error.response?.data?.message || "Error al listar suministros.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const createSupply = async (supply) => {
    try {
      const response = await createSupplyRequest(supply);
      if (response.status === 200) {
        setSuccessMessage("Suministro creado con éxito.");
        await listSupplies();
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };

  const updateSupply = async (supply) => {
    console.log(supply);
    try {
      const response = await updateSupplyRequest(supply);
      if (response.status === 200) {
        setSuccessMessage("Suministro actualizado con éxito.");
        await listSupplies(); // Actualiza la lista de suministros después de actualizar uno
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };

  // Funciones para manejar fechas de procedimientos
  const listProcedureDates = async () => {
    setIsLoading(true);
    try {
      const response = await listProcedureDateRequest();
      setProcedureDates(response.data.procedureDate); // Ajusta según la estructura de tu API
      return response;
    } catch (error) {
      setErrors([
        error.response?.data?.message ||
          "Error al listar fechas de procedimientos.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const createProcedureDate = async (procedureDate) => {
    try {
      const response = await createProcedureDateRequest(procedureDate);
      if (response.status === 200) {
        setSuccessMessage("Fecha de procedimiento creada con éxito.");
        await listProcedureDates(); // Actualiza la lista después de crear
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };

  const updateProcedureDate = async (procedureDate) => {
    try {
      const response = await updateProcedureDateRequest(procedureDate);
      if (response.status === 200) {
        setSuccessMessage("Fecha de procedimiento actualizada con éxito.");
        await listProcedureDates(); // Actualiza la lista después de actualizar
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };
  // Funciones para manejar tratamientos
  const listTreatments = async () => {
    setIsLoading(true);
    try {
      const response = await listtreatmeantRequest();
      setTreatments(response.data.treatment); // Ajusta según la estructura de la respuesta de la API
      return response;
    } catch (error) {
      setErrors([
        error.response?.data?.message || "Error al listar tratamientos.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const createTreatment = async (treatment) => {
    try {
      const response = await createTreatmeantRequest(treatment);
      if (response.status === 200) {
        setSuccessMessage("Tratamiento creado con éxito.");
        await listTreatments(); // Actualiza la lista de tratamientos después de crear uno nuevo
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };

  const updateTreatment = async (treatment) => {
    try {
      const response = await updateTreatmeantRequest(treatment);
      if (response.status === 200) {
        setSuccessMessage("Tratamiento actualizado con éxito.");
        await listTreatments(); // Actualiza la lista de tratamientos después de actualizar uno
      }
      return response;
    } catch (error) {
      const errorMessages = error.response?.data?.map((err) => err.message) || [
        "Error desconocido.",
      ];
      setErrors(errorMessages);
    }
  };
  const getProcedureDateByNumSS = async (numSS) => {
    try {
      const response = await getProcedureDateByNumSSRequest(numSS);
      return response.data; // Ajusta según la estructura de tu API
    } catch (error) {
      setErrors([
        error.response?.data?.message ||
          "Error al obtener la fecha de procedimiento.",
      ]);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        // Tratamientos
        listTreatments,
        createTreatment,
        updateTreatment,
        treatments,
        createDate,
        listDates,
        updatePatient,
        createPatient,
        listSupplies,
        createSupply,
        updateSupply,
        supplies,
        dates,
        procedureDates, // Estado de fechas de procedimientos
        listProcedureDates, // Función para listar fechas de procedimientos
        createProcedureDate, // Función para crear fechas de procedimientos
        updateProcedureDate, // Función para actualizar fechas de procedimientos
        getProcedureDateByNumSS, // Función para obtener fecha de procedimiento por número de seguro social
        isLoading,
        errors,
        successMessage,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
