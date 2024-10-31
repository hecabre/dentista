import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react"; // Importa Select y Option
import { useState } from "react";

const procedimientos = [
  { nombreProcedimiento: "Chequeo", procedimiento: 2 },
  { nombreProcedimiento: "Limpieza", procedimiento: 3 },
  { nombreProcedimiento: "Extracción", procedimiento: 6 },
  { nombreProcedimiento: "Caries", procedimiento: 7 },
  { nombreProcedimiento: "Ortodoncia", procedimiento: 11 },
  { nombreProcedimiento: "Mantenimiento Ortodoncia", procedimiento: 20 },
  { nombreProcedimiento: "Blanqueamiento", procedimiento: 21 },
  { nombreProcedimiento: "Carie Prueba 2", procedimiento: 2020 },
];

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

    if (success) reset(); // Limpiar el formulario tras una creación exitosa

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
          <label htmlFor="procedimiento" className="block mb-2">
            Procedimiento
          </label>
          <Select
            id="procedimiento"
            {...register("procedimiento", {
              required: "El procedimiento es necesario",
            })}
            error={errors.procedimiento && errors.procedimiento.message}
            className={`block w-full p-2 border rounded ${
              errors.cod_procedimiento ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Option value="">Selecciona un procedimiento</Option>
            {procedimientos.map((proc) => (
              <Option key={proc.procedimientoo} value={proc.procedimiento}>
                {proc.nombreProcedimiento}
              </Option>
            ))}
          </Select>
          {errors.prodecimiento && (
            <span className="text-red-500">{errors.procedimiento.message}</span>
          )}
        </div>

        <Button
          type="submit"
          color="lightBlue"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear Tratamiento"}
        </Button>
      </form>
    </div>
  );
}

export default CreateTreatmentForm;
