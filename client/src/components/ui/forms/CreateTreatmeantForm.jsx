import { useForm } from "react-hook-form";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

function CreateTreatmentForm({ onCreate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const success = await onCreate(data); // onCreate es la función de creación de tratamiento

    if (success) {
      reset(); // Limpiar el formulario tras una creación exitosa
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <Typography variant="h4" className="text-center text-sapphire-500 mb-6">
        Crear Tratamiento
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            label="Fecha"
            type="date"
            {...register("fecha", { required: "La fecha es requerida" })}
            error={errors.fecha && errors.fecha.message}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Teléfono del Paciente"
            type="number"
            {...register("pacientes_telefono", {
              required: "El teléfono es necesario",
            })}
            error={
              errors.pacientes_telefono && errors.pacientes_telefono.message
            }
          />
        </div>

        <div className="mb-4">
          <Input
            label="Procedimiento"
            {...register("procedimiento", {
              required: "El procedimiento es necesario",
            })}
            error={errors.procedimiento && errors.procedimiento.message}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Observaciones"
            {...register("observaciones", {
              required: "Las observaciones son necesarias",
            })}
            error={errors.observaciones && errors.observaciones.message}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Medicamento Recetado"
            {...register("medicamentoRecetado", {
              required: "El medicamento es necesario",
            })}
            error={
              errors.medicamentoRecetado && errors.medicamentoRecetado.message
            }
          />
        </div>

        <div className="mb-4">
          <Input
            label="Citas Faltantes"
            type="number"
            {...register("citasFaltante", {
              required: "Las citas faltantes son necesarias",
            })}
            error={errors.citasFaltante && errors.citasFaltante.message}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-sapphire-500 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando..." : "Crear Tratamiento"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTreatmentForm;
