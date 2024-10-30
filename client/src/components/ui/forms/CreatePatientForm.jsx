// PatientForm.js
import { Input, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const CreatePatientForm = ({ onSubmit, onCancel, defaultValues }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const handleCancel = () => {
    reset(); // Resetea el formulario al cancelar
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mb-4">
      <Input label="Nombre" {...register("nombre")} required className="mb-4" />
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
      <Input label="Género" {...register("genero")} required className="mb-4" />
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
          {defaultValues ? "Guardar Cambios" : "Crear Paciente"}
        </Button>
        <Button
          type="button"
          className="ml-2 bg-red-500 text-white"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default CreatePatientForm;
