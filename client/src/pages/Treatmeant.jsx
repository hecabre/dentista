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
        fecha: editingTreatment.Fecha
          ? editingTreatment.Fecha.split("T")[0] // Formatear fecha
          : "",
        pacientes_telefono: editingTreatment.pacientes_telefono,
        procedimiento: editingTreatment.Procedimineto,
        observaciones: editingTreatment.Observaciones,
        medicamentoRecetado: editingTreatment.MedicamentoRecetado,
        citasFaltante: editingTreatment.CitasFaltenate,
      });
    }
  }, [editingTreatment, reset]);

  const headers = [
    "Fecha",
    "pacientes_telefono",
    "Procedimineto",
    "Observaciones",
    "MedicamentoRecetado",
    "CitasFaltenate",
  ];
  const displayHeaders = [
    "Fecha",
    "Telefono del Paciente",
    "Procedimineto",
    "Observaciones",
    "MedicamentoRecetado",
    "CitasFaltenate",
  ];

  // Formatear las fechas de los tratamientos
  const formattedTreatments = treatments.map((treatment) => ({
    ...treatment,
    Fecha: treatment.Fecha ? treatment.Fecha.split("T")[0] : "", // Formatear fecha
  }));

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
      citasFaltante: parseInt(data.citasFaltante, 10),
      pacientes_telefono: parseInt(data.pacientes_telefono, 10),
    };
    console.log(newTreatment);
    const treatmentCreate = await createTreatment(newTreatment);

    if (treatmentCreate && treatmentCreate.status === 200) {
      await listTreatments();
      setShowCreateForm(false);
      reset();
    } else {
      console.error("Error al crear el tratamiento:", treatmentCreate);
    }
  };

  const procedimientos = [
    { procedimiento: "Chequeo", cod_procedimiento: 2 },
    { procedimiento: "Limpieza", cod_procedimiento: 3 },
    { procedimiento: "Extracción", cod_procedimiento: 6 },
    { procedimiento: "Caries", cod_procedimiento: 7 },
    { procedimiento: "Ortodoncia", cod_procedimiento: 11 },
    { procedimiento: "Mantenimiento Ortodoncia", cod_procedimiento: 20 },
    { procedimiento: "Blanqueamiento", cod_procedimiento: 21 },
    { procedimiento: "Carie Prueba 2", cod_procedimiento: 2020 },
  ];

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
                <label htmlFor="procedimiento" className="block mb-2">
                  Procedimiento
                </label>
                <select
                  id="procedimiento"
                  {...register("procedimiento", {
                    required: "El procedimiento es necesario",
                  })}
                  className="block w-full p-2 border rounded mb-4"
                >
                  <option value="">Selecciona un procedimiento</option>
                  {procedimientos.map((proc) => (
                    <option
                      key={proc.cod_procedimiento}
                      value={proc.procedimiento}
                    >
                      {proc.procedimiento}
                    </option>
                  ))}
                </select>
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
                displayHeaders={displayHeaders}
                TABLE_ROWS={formattedTreatments} // Usar tratamientos con fecha formateada
                onEdit={handleEditClick}
                showEditColumn={false}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Treatmeant;
