import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

function CreateSupplyForm({ onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm();

  const handleCreateSubmit = (data) => {
    onSubmit(data);
    reset(); // Resetea el formulario después de enviar
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateSubmit)}
      className="w-full max-w-md"
    >
      <Input
        label="ID Suministro"
        type="number" // Cambia a 'text' si deseas permitir caracteres no numéricos
        {...register("id_suministro", { required: true })}
        required
        className="mb-4"
      />
      <Input
        label="Nombre"
        {...register("nombre", { required: true })}
        required
        className="mb-4"
      />
      <Input
        type="number"
        label="Cantidad"
        {...register("cantidad", { required: true })}
        required
        className="mb-4"
      />
      <Input
        type="date"
        label="Caducidad"
        {...register("caducidad")}
        className="mb-4"
      />
      <Input label="Estado" {...register("estado")} className="mb-4" />
      <Input
        label="Vigente (1: Sí, 0: No)"
        {...register("vigente", { required: true })}
        required
        className="mb-4"
      />
      <div className="flex justify-between">
        <Button type="submit" className="bg-sapphire-500 text-white">
          Crear Suministro
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
}

export default CreateSupplyForm;
