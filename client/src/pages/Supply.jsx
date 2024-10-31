import { StickyNavbar } from "../components/Navbar";
import { useApi } from "../context/ApiContext";
import { Table } from "../components/ui/Table";
import { Spinner, Button, Typography, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreateSupplyForm from "../components/ui/forms/CreateSupplyForm";

function Supply() {
  const {
    listSupplies,
    supplies,
    isLoading,
    errors,
    updateSupply,
    createSupply,
  } = useApi();
  const [editingSupply, setEditingSupply] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Cargar suministros al inicio
  useEffect(() => {
    listSupplies();
  }, []);

  // Manejar el estado del formulario de edición
  useEffect(() => {
    if (editingSupply) {
      reset({
        nombre: editingSupply.Nombre,
        cantidad: editingSupply.Cantidad,
        caducidad: editingSupply.Caducidad
          ? editingSupply.Caducidad.split("T")[0]
          : "",
        estado: editingSupply.Estado,
        vigente: editingSupply.vigente ? "1" : "0", // Manejo simplificado
      });
    }
  }, [editingSupply, reset]);

  const headers = [
    "Nombre",
    "Cantidad",
    "Caducidad",
    "Estado",
    "Vigente",
    "ID_Suministro",
  ];

  // Formatear las fechas de caducidad
  const formattedSupplies = supplies.map((supply) => ({
    ...supply,
    Caducidad: supply.Caducidad ? supply.Caducidad.split("T")[0] : "",
  }));

  const handleEditClick = (row) => {
    setEditingSupply(row);
    setShowCreateForm(false); // Cerrar el formulario de creación al editar
  };

  const onEditSubmit = async (data) => {
    const updatedData = {
      ...data,
      id_suministro: parseInt(editingSupply.ID_Suministro, 10),
      cantidad: parseInt(data.cantidad, 10),
      vigente: data.vigente === "1" ? "1" : "0",
    };

    const supplyUpdate = await updateSupply(updatedData);

    if (supplyUpdate) {
      await listSupplies();
      setEditingSupply(null);
      reset();
    }
  };

  const onCreateSubmit = async (data) => {
    const newSupply = {
      ...data,
      id_suministro: parseInt(data.id_suministro, 10),
      cantidad: parseInt(data.cantidad, 10),
      vigente: data.vigente === "1" ? "1" : "0",
    };

    const supplyCreate = await createSupply(newSupply);

    if (supplyCreate && supplyCreate.status === 200) {
      await listSupplies(); // Recargar suministros después de crear
      setShowCreateForm(false); // Cerrar el formulario de creación
      reset();
    } else {
      console.error("Error al crear el suministro:", supplyCreate);
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
          Suministros
        </Typography>
        {errors.map((error, i) => (
          <div key={i}>
            <span className="font-poppins-regular text-red-500">{error}</span>
          </div>
        ))}
        {isLoading && !supplies ? (
          <Spinner />
        ) : (
          <>
            <Button
              className="mb-4 bg-green-500 text-white"
              onClick={() => {
                setShowCreateForm(true);
                setEditingSupply(null); // Asegurarse de que no haya un suministro en edición
              }}
            >
              Crear Suministro
            </Button>
            {showCreateForm && (
              <CreateSupplyForm
                onSubmit={onCreateSubmit}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
            {editingSupply && !showCreateForm ? (
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
                  label="Cantidad"
                  {...register("cantidad")}
                  required
                  type="number"
                  className="mb-4"
                />
                <Input
                  label="Caducidad"
                  {...register("caducidad")}
                  required
                  type="date"
                  className="mb-4"
                />
                <Input
                  label="Estado"
                  {...register("estado")}
                  required
                  className="mb-4"
                />
                <Input
                  label="Vigente"
                  {...register("vigente")}
                  required
                  type="select"
                  className="mb-4"
                />
                <Input
                  label="ID Suministro"
                  value={editingSupply.ID_Suministro}
                  readOnly
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
                      setEditingSupply(null);
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
                TABLE_ROWS={formattedSupplies}
                onEdit={handleEditClick}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Supply;
