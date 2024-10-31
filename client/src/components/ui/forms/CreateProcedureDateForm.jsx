// components/ui/forms/CreateProcedureDateForm.js
import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const CreateProcedureDateForm = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, reset } = useForm();
  console.log(initialData);
  // Resetea el formulario con los datos iniciales si hay alguno
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <Input
        label="Número de Seguro Social"
        type="number"
        {...register("empleado_numss")}
        required
        disabled // Deshabilitado para edición
        value={initialData.cita_empleado_numss}
        className="mb-4"
      />
      <Input
        label="Fecha"
        type="date"
        {...register("cita_fecha")}
        required
        disabled // Deshabilitado para edición
        className="mb-4"
      />
      <Input
        label="Hora"
        type="time"
        {...register("cita_hora")}
        required
        disabled // Deshabilitado para edición
        className="mb-4"
      />
      <Input
        label="Código del Procedimiento"
        type="number"
        {...register("cod_procedimiento")}
        required
        className="mb-4"
      />
      <div className="flex justify-between">
        <Button type="submit" className="bg-sapphire-500 text-white">
          {initialData ? "Actualizar Procedimiento" : "Crear Procedimiento"}
        </Button>
        <Button
          type="button"
          className="ml-2 bg-red-500 text-white"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default CreateProcedureDateForm;
