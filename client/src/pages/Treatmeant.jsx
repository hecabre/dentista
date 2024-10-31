import { StickyNavbar } from "../components/Navbar";
import { useApi } from "../context/ApiContext";
import { Table } from "../components/ui/Table";
import { Spinner, Button, Typography, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Treatmeant() {
  const {
    listTreatments,
    treatments,
    isLoading,
    errors,
    updateTreatment,
    createTreatment,
  } = useApi();

  const [editingTreatment, setEditingTreatment] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Cargar tratamientos al inicio
  useEffect(() => {
    listTreatments();
  }, []);

  // Manejar el estado del formulario de edición
  useEffect(() => {
    if (editingTreatment) {
      reset({
        fecha: editingTreatment.fecha
          ? editingTreatment.fecha.split("T")[0]
          : "",
        pacientes_telefono: editingTreatment.pacientes_telefono,
        procedimiento: editingTreatment.procedimiento,
        observaciones: editingTreatment.observaciones,
        medicamentoRecetado: editingTreatment.medicamentoRecetado,
        citasFaltante: editingTreatment.citasFaltante,
      });
    }
  }, [editingTreatment, reset]);

  const headers = [
    "Fecha",
    "Teléfono Paciente",
    "Procedimiento",
    "Observaciones",
    "Medicamento Recetado",
    "Citas Faltantes",
    "ID_Tratamiento",
  ];

  const handleEditClick = (row) => {
    setEditingTreatment(row);
    setShowCreateForm(false);
  };

  const onEditSubmit = async (data) => {
    const updatedData = {
      ...data,
      id_tratamiento: editingTreatment.id_tratamiento,
    };

    const treatmentUpdate = await updateTreatment(updatedData);

    if (treatmentUpdate) {
      await listTreatments();
      setEditingTreatment(null);
      reset();
    }
  };

  const onCreateSubmit = async (data) => {
    const newTreatment = {
      ...data,
    };

    const treatmentCreate = await createTreatment(newTreatment);

    if (treatmentCreate && treatmentCreate.status === 200) {
      await listTreatments();
      setShowCreateForm(false);
      reset();
    } else {
      console.error("Error al crear el tratamiento:", treatmentCreate);
    }
  };

  return (
    <div>
      <StickyNavbar />
      <section className="mx-auto flex w-full flex-col items-center justify-center px-2 py-5 mt-3">
        <Typography
          variant="h2"
          className="font-poppins-semibold text-5xl text-sapphire-500"
        >
          Tratamientos
        </Typography>

        {errors.map((error, i) => (
          <div key={i}>
            <span className="font-poppins-regular text-red-500">{error}</span>
          </div>
        ))}

        {isLoading && !treatments ? (
          <Spinner />
        ) : (
          <>
            <Button
              className="mb-4 bg-green-500 text-white"
              onClick={() => {
                setShowCreateForm(true);
                setEditingTreatment(null);
              }}
            >
              Crear Tratamiento
            </Button>

            {showCreateForm && (
              <form
                onSubmit={handleSubmit(onCreateSubmit)}
                className="w-full max-w-md"
              >
                <Input
                  label="Fecha"
                  type="date"
                  {...register("fecha", { required: "La fecha es requerida" })}
                  className="mb-4"
                />
                <Input
                  label="Teléfono del Paciente"
                  type="number"
                  {...register("pacientes_telefono", {
                    required: "El teléfono es necesario",
                  })}
                  className="mb-4"
                />
                <Input
                  label="Procedimiento"
                  {...register("procedimiento", {
                    required: "El procedimiento es necesario",
                  })}
                  className="mb-4"
                />
                <Input
                  label="Observaciones"
                  {...register("observaciones", {
                    required: "Las observaciones son necesarias",
                  })}
                  className="mb-4"
                />
                <Input
                  label="Medicamento Recetado"
                  {...register("medicamentoRecetado", {
                    required: "El medicamento es necesario",
                  })}
                  className="mb-4"
                />
                <Input
                  label="Citas Faltantes"
                  type="number"
                  {...register("citasFaltante", {
                    required: "Las citas faltantes son necesarias",
                  })}
                  className="mb-4"
                />
                <div className="flex justify-between">
                  <Button type="submit" className="bg-sapphire-500 text-white">
                    Crear Tratamiento
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-red-500 text-white"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}

            {editingTreatment && !showCreateForm ? (
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="w-full max-w-md"
              >
                <Input
                  label="Fecha"
                  type="date"
                  {...register("fecha")}
                  className="mb-4"
                />
                <Input
                  label="Teléfono del Paciente"
                  type="number"
                  {...register("pacientes_telefono")}
                  className="mb-4"
                />
                <Input
                  label="Procedimiento"
                  {...register("procedimiento")}
                  className="mb-4"
                />
                <Input
                  label="Observaciones"
                  {...register("observaciones")}
                  className="mb-4"
                />
                <Input
                  label="Medicamento Recetado"
                  {...register("medicamentoRecetado")}
                  className="mb-4"
                />
                <Input
                  label="Citas Faltantes"
                  type="number"
                  {...register("citasFaltante")}
                  className="mb-4"
                />
                <div className="flex justify-between">
                  <Button type="submit" className="bg-sapphire-500 text-white">
                    Guardar Cambios
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-red-500 text-white"
                    onClick={() => {
                      setEditingTreatment(null);
                      reset();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <Table
                headers={headers}
                displayHeaders={headers}
                TABLE_ROWS={treatments}
                onEdit={handleEditClick}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Treatmeant;
