import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

// JSON que define la estructura para crear un paciente
export const CreatePatientSchema = z.object({
  body: z.object({
    nombre: z
      .string({
        invalid_type_error: "El nombre debe de ser un texto",
        required_error: "El nombre es requerido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El nombre contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    apellidoPaterno: z
      .string({
        invalid_type_error: "El apellido paterno debe de ser un texto",
        required_error: "El apellido paterno es requerido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El apellido paterno contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    apellidoMaterno: z
      .string({
        invalid_type_error: "El apellido materno debe de ser un texto",
        required_error: "El apellido materno es requerido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El apellido materno contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    fechaNacimiento: z
      .string({ required_error: "La fecha es requerida" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    genero: z.enum(["M", "H"], {
      invalid_type_error: "El genero debe de ser un texto",
      required_error: "El genero es requerido",
    }),
    telefono: z.number({
      required_error: "El telefono es requerido",
      invalid_type_error: "El telefono es un numero",
    }),
    dominio: z
      .string({
        required_error: "El dominio del correo es necesario",
        invalid_type_error: "El dominio del correo debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El dominio contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      })
      .optional(),
    rfcLetras: z
      .string({
        invalid_type_error: "Las letras del RFC deben ser texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "Las letras del RFC contienen caracteres no permitidos que podrían causar inyecciones SQL.",
      })
      .optional(),
    rfcNumeros: z
      .number({
        invalid_type_error: "Los números del RFC deben ser un número",
      })
      .optional(),
  }),
});

// JSON que define la estructura para actualizar un paciente
export const UpdatePatientSchema = z.object({
  body: z.object({
    nombre: z
      .string({
        invalid_type_error: "El nombre debe de ser un texto",
        required_error: "El nombre es requerido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El nombre contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    apellidoPaterno: z
      .string({
        invalid_type_error: "El apellido paterno debe de ser un texto",
        required_error: "El apellido paterno es requerido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El apellido paterno contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    apellidoMaterno: z
      .string({
        invalid_type_error: "El apellido materno debe de ser un texto",
        required_error: "El apellido materno es requerido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El apellido materno contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    fechaNacimiento: z
      .string({ required_error: "La fecha es requerida" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    genero: z.enum(["M", "H"], {
      invalid_type_error: "El genero debe de ser un texto",
      required_error: "El genero es requerido",
    }),
    dominio: z
      .string({
        required_error: "El dominio del correo es necesario",
        invalid_type_error: "El dominio del correo debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El dominio contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      })
      .optional(),
    rfcletras: z
      .string({
        invalid_type_error: "Las letras del RFC deben ser texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "Las letras del RFC contienen caracteres no permitidos que podrían causar inyecciones SQL.",
      })
      .optional(),
    rfcnumeros: z
      .number({
        invalid_type_error: "Los números del RFC deben ser un número",
      })
      .optional(),
  }),
  params: z.object({
    telefono: z
      .string({ required_error: "El identificador es necesario" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message: "El identificador no debe contener palabras reservadas de SQL",
      })
      .regex(/^\d+$/, "El identificador debe de ser positivo")
      .transform((str) => Number(str))
      .refine((val) => val > 0, "El identificador debe ser positivo"),
  }),
});

// Exportamos los JSON como tipos
export type CreatePatientBodyType = z.infer<typeof CreatePatientSchema>["body"];
export type UpdatePatientBodyType = z.infer<typeof UpdatePatientSchema>["body"];
export type UpdatePatientParamsType = z.infer<
  typeof UpdatePatientSchema
>["params"];
