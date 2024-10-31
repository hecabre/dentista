import { StickyNavbar } from "../components/Navbar";
import { useApi } from "../context/ApiContext";
import { Table } from "../components/ui/Table";
import { Spinner, Button, Typography, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreatePatientForm from "../components/ui/forms/CreatePatientForm";

function Doctor() {
  const { listDates, dates, isLoading, errors, updatePatient, createPatient } =
    useApi();
  const [editingPatient, setEditingPatient] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar el formulario de creación
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    listDates();
  }, []);

  const headers = [
    "nombre",
    "apellidoPaterno",
    "apellidoMaterno",
    "fechaNacimiento",
    "genero",
    "telefono",
    "dominio",
    "rfc",
  ];

  const displayHeaders = [
    "Nombre",
    "Apellido Paterno",
    "Apellido Materno",
    "Fecha Nacimiento",
    "Género",
    "Teléfono",
    "Dominio",
    "RFC",
  ];

  const formattedDates = dates.map((date) => ({
    ...date,
    fechaNacimiento: date.fechaNacimiento.split("T")[0],
  }));

  const handleEditClick = (row) => {
    setEditingPatient(row);
    reset({
      nombre: row.nombre,
      apellidoPaterno: row.apellidoPaterno,
      apellidoMaterno: row.apellidoMaterno,
      fechaNacimiento: row.fechaNacimiento,
      genero: row.genero,
      telefono: row.telefono.substring(2),
      dominio: row.dominio,
      rfcletras: "RFC",
      rfcnumeros: row.rfc ? row.rfc.replace(/[a-zA-Z]/g, "") : "",
    });
  };

  const onEditSubmit = async (data) => {
    const updatedData = {
      ...data,
      rfcnumeros: parseInt(data.rfcnumeros, 10),
    };
    console.log(updatedData);
    console.log("Datos enviados para editar:", updatedData);

    const patientUpdate = await updatePatient(updatedData);

    // Verifica si la actualización fue exitosa (estado 200)
    if (patientUpdate && patientUpdate.status === 200) {
      // Volver a cargar la lista de pacientes
      await listDates();
    }

    console.log(patientUpdate);
    setEditingPatient(null);
    reset();
  };

  const onCreateSubmit = async (data) => {
    const newData = {
      ...data,
      rfcnumeros: parseInt(data.rfcnumeros, 10),
      telefono: parseInt(data.telefono, 10),
    };
    console.log("Datos enviados para crear:", newData);

    const patientCreate = await createPatient(newData);

    // Verifica si la creación fue exitosa
    if (patientCreate.status === 200) {
      await listDates();
    }

    console.log(patientCreate);
    setShowCreateForm(false); // Oculta el formulario de creación después de enviar
    reset();
  };

  return (
    <div>
      <StickyNavbar />
      <section className="mx-auto flex w-full flex-col items-center justify-center px-2 py-5 mt-3">
        <Typography
          variant="h2"
          className="font-poppins-semibold text-5xl text-sapphire-500"
        >
          Pacientes
        </Typography>
        {errors.map((error, i) => (
          <div key={i}>
            <span className="font-poppins-regular text-red-500">{error}</span>
          </div>
        ))}
        {isLoading && !dates ? (
          <Spinner />
        ) : (
          <>
            <Button
              className="mb-4 bg-green-500 text-white"
              onClick={() => setShowCreateForm(true)}
            >
              Crear Paciente
            </Button>
            {showCreateForm && ( // Mostrar formulario de creación si el estado es verdadero
              <CreatePatientForm
                onSubmit={onCreateSubmit}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
            {editingPatient ? (
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="w-full max-w-md"
              >
                <Input
                  label="Nombre"
                  {...register("nombre")}
                  required
                  className="mb-4"
                />
                <Input
                  label="Apellido Paterno"
                  {...register("apellidoPaterno")}
                  required
                  className="mb-4"
                />
                <Input
                  label="Apellido Materno"
                  {...register("apellidoMaterno")}
                  required
                  className="mb-4"
                />
                <Input
                  type="date"
                  label="Fecha Nacimiento"
                  {...register("fechaNacimiento")}
                  required
                  className="mb-4"
                />
                <Input
                  label="Género"
                  {...register("genero")}
                  required
                  className="mb-4"
                />
                <Input
                  label="Teléfono"
                  {...register("telefono")}
                  required
                  className="mb-4"
                />
                <Input
                  label="Dominio"
                  {...register("dominio")}
                  required
                  className="mb-4"
                />
                <input type="hidden" {...register("rfcletras")} value="RFC" />
                <Input
                  label="RFC"
                  {...register("rfcnumeros")}
                  required
                  className="mb-4"
                />
                <div className="flex justify-between">
                  <Button type="submit" className="bg-sapphire-500 text-white">
                    Guardar Cambios
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-red-500 text-white"
                    onClick={() => setEditingPatient(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <Table
                headers={headers}
                displayHeaders={displayHeaders}
                TABLE_ROWS={formattedDates}
                onEdit={handleEditClick}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Doctor;
