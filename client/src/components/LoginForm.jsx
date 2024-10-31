import { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { sqlRegex } from "../const/sqlRegex";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [isReceptionist, setIsReceptionist] = useState(false);
  const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState(false); // Nuevo estado para doctor
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    loginDoctor,
    loginRecepcionist,
    isAuthenticated,
    errors: AuthErrors,
  } = useAuth();
  const navigate = useNavigate();

  const handleToggleRole = () => {
    setIsReceptionist(!isReceptionist);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    if (isReceptionist) {
      const recepcionist = await loginRecepcionist(data);
      console.log(recepcionist);
    } else {
      const doctor = await loginDoctor(data);
      setIsDoctorAuthenticated(doctor);
      console.log(doctor);
    }
  });

  useEffect(() => {
    if (isAuthenticated && isReceptionist) {
      navigate("/recepcionista");
    } else if (isAuthenticated && !isReceptionist) {
      navigate("/doctor");
    }
  }, [isAuthenticated, navigate, isReceptionist]);

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex items-center justify-center"
    >
      <Typography
        variant="h4"
        className="text-sapphire-600 font-poppins-regular text-center"
      >
        Iniciar Sesión
      </Typography>
      <Typography className="mt-1 font-normal text-sapphire-400 font-poppins-regular text-center">
        Ingresa tu usuario y contraseña si eres{" "}
        {isReceptionist ? "recepcionista" : "médico"}
      </Typography>
      {AuthErrors.map((error, i) => (
        <span key={i} className=" font-poppins-regular text-red-500">
          {error}
        </span>
      ))}
      <form
        className="mt-8 mb-2  w-full max-w-lg flex flex-col items-center"
        onSubmit={onSubmit}
      >
        <div className="mb-1 w-full flex flex-col gap-6">
          <Typography
            variant="h6"
            className="text-sapphire-600 -mb-3 font-poppins-regular"
          >
            Usuario
          </Typography>
          {errors.user && (
            <span className="text-red-500 text-sm font-poppins-regular">
              Este campo es obligatorio
            </span>
          )}
          <Input
            size="lg"
            required
            placeholder="usuario_ejemplo"
            className="!border-t-blue-gray-200 focus:!border-sapphire-500 font-poppins-regular w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("user", {
              required: true,
              validate: {
                noSql: (value) => {
                  return (
                    !sqlRegex.test(value) ||
                    "El campo no puede tener código SQL"
                  );
                },
              },
            })}
          />
          <Typography
            variant="h6"
            className="text-sapphire-600 -mb-3 font-poppins-regular"
          >
            Contraseña
          </Typography>
          {errors.password && (
            <span className="text-red-500 text-sm font-poppins-regular">
              Este campo es obligatorio
            </span>
          )}
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-sapphire-500 w-full font-poppins-regular"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("password", {
              required: true,
              validate: {
                noSql: (value) => {
                  return (
                    !sqlRegex.test(value) ||
                    "El campo no puede tener código SQL"
                  );
                },
              },
            })}
          />
        </div>
        <Button
          className="mt-6 bg-sapphire-600 font-poppins-regular w-full"
          type="submit"
        >
          Iniciar
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal font-poppins-regular"
        ></Typography>
      </form>
    </Card>
  );
}
