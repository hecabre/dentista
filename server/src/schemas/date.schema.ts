import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

//Json para crear una cita en la db
export const CreateDateSchema = z.object({
  body: z.object({
    empleado_numss: z.number({
      required_error: "El numero de seguridad social es necesario",
      invalid_type_error: "El numero de seguridad social debe de ser un numero",
    }),
    telefono: z.number({
      required_error: "El telefono es requerido",
      invalid_type_error: "El telefono debe de ser un numero",
    }),
    fecha: z
      .string({ required_error: "La fecha es requerida" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    estado: z
      .enum(["pagado", "no pagado"], {
        required_error: "Es necesario el estado",
        invalid_type_error: "El estado debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El estado contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    hora: z
      .string({
        required_error: "La hora es necesaria",
        invalid_type_error: "La hora debe de ser un texto",
      })
      .time()
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La hora contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    ano_cita: z.number({
      required_error: "El año de la cita es necesario",
      invalid_type_error: "El año de la cita debe de ser un numero",
    }),
    num_cita: z.number({
      required_error: "El numero de la cita es necesario",
      invalid_type_error: "El numero de la cita debe de ser un numero",
    }),
  }),
});

//Json para actualizar una cita
export const UpdateDateSchema = z.object({
  body: z.object({
    telefono: z.number({
      required_error: "El telefono es requerido",
      invalid_type_error: "El telefono debe de ser un numero",
    }),
    fecha: z
      .string({ required_error: "La fecha es requerida" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    estado: z
      .enum(["pagado", "no pagado"], {
        required_error: "Es necesario el estado",
        invalid_type_error: "El estado debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El estado contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    hora: z
      .string({
        required_error: "La hora es necesaria",
        invalid_type_error: "La hora debe de ser un texto",
      })
      .time()
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La hora contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    ano_cita: z.number({
      required_error: "El año de la cita es necesario",
      invalid_type_error: "El año de la cita debe de ser un numero",
    }),
    num_cita: z.number({
      required_error: "El numero de la cita es necesario",
      invalid_type_error: "El numero de la cita debe de ser un numero",
    }),
  }),
  params: z.object({
    empleado_numss: z
      .string({ required_error: "El numero de seguridad social es necesario" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message:
          "El numero de seguridad social no debe contener palabras reservadas de SQL",
      })
      .regex(/^\d+$/, "El numero de seguridad social debe de ser positivo")
      .transform((str) => Number(str))
      .refine(
        (val) => val > 0,
        "El numero de seguridad social debe ser positivo"
      ),
  }),
});
//Exportacion de tipos para usarlo en los Request y Response
export type CreateDateBodyType = z.infer<typeof CreateDateSchema>["body"];
export type UpdateDateBodyType = z.infer<typeof UpdateDateSchema>["body"];
export type UpdateDateParamsType = z.infer<typeof UpdateDateSchema>["params"];
