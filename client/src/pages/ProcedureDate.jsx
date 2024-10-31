import { StickyNavbar } from "../components/Navbar";
import { useApi } from "../context/ApiContext";
import { Table } from "../components/ui/Table";
import { Spinner, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

function ProcedureDate() {
  const { listProcedureDates, procedureDates, isLoading, errors } = useApi();

  useEffect(() => {
    listProcedureDates();
  }, []);

  const headers = [
    "cita_empleado_numss",
    "cita_fecha",
    "cita_hora",
    "procedimiento",
    "monto",
  ];
  const displayHeaders = [
    "Número de Seguro Social",
    "Fecha",
    "Hora",
    "Procedimiento",
    "Precio",
  ];

  // Función para formatear la hora a HH:mm:ss
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const seconds = "00"; // Suponiendo que los segundos son 00
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds}`;
  };

  // Función para formatear la fecha a YYYY-MM-DD
  const formatDate = (date) => {
    return date.split("T")[0]; // Elimina la parte de hora y milisegundos
  };

  return (
    <div>
      <StickyNavbar />
      <section className="mx-auto flex w-full flex-col items-center justify-center px-2 py-5 mt-3">
        <Typography
          variant="h2"
          className="font-poppins-semibold text-5xl text-sapphire-500"
        >
          Fechas de Procedimiento
        </Typography>

        {errors.map((error, i) => (
          <div key={i}>
            <span className="font-poppins-regular text-red-500">{error}</span>
          </div>
        ))}

        {isLoading && !procedureDates ? (
          <Spinner />
        ) : (
          <Table
            headers={headers}
            displayHeaders={displayHeaders}
            showEditColumn={false}
            TABLE_ROWS={procedureDates.map((row) => ({
              ...row,
              cita_fecha: formatDate(row.cita_fecha), // Formatear la fecha aquí
            }))}
          />
        )}
      </section>
    </div>
  );
}

export default ProcedureDate;
