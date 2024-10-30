import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

//Json para crear los tratamientos
export const CreateTreatmentSchema = z.object({
  body: z.object({
    fecha: z
      .string({ required_error: "La fecha es requerida" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    pacientes_telefono: z.number({
      required_error: "El telefono es necesario",
      invalid_type_error: "El telefono debe de ser un numero",
    }),
    procedimiento: z.string({
      required_error: "El procedimiento es necesario",
      invalid_type_error: "El procedimiento debe de ser un texto",
    }),
    observaciones: z
      .string({
        required_error: "Las observaciones son necesarias",
        invalid_type_error: "Las observaciones deben de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "Las observaciones contienen caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    medicamentoRecetado: z
      .string({
        required_error: "Los medicamentos recetados son necesarias",
        invalid_type_error: "Los medicamentos recetados deben de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "Los medicamentos recetados  no permitidos que podrían causar inyecciones SQL.",
      }),
    citasFaltante: z.number({
      required_error: "Las citas faltantes son necesario",
      invalid_type_error: "Las citas faltantes deben de ser un numero",
    }),
  }),
});

//Json para la actualizacion de los tratamientos
export const UpdateTreatmentSchema = z.object({
  body: z.object({
    procedimiento: z
      .string({
        required_error: "El procedimiento es necesario",
        invalid_type_error: "El procedimiento debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El procedimiento contienen caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    observaciones: z
      .string({
        required_error: "Las observaciones son necesarias",
        invalid_type_error: "Las observaciones deben de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "Las observaciones contienen caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    medicamentoRecetado: z
      .string({
        required_error: "Los medicamentos recetados son necesarias",
        invalid_type_error: "Los medicamentos recetados deben de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "Los medicamentos recetados  no permitidos que podrían causar inyecciones SQL.",
      }),
    citasFaltante: z.number({
      required_error: "Las citas faltantes son necesario",
      invalid_type_error: "Las citas faltantes deben de ser un numero",
    }),
  }),
  params: z.object({
    fecha: z
      .string({ required_error: "La fecha es requerida" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    pacientes_telefono: z
      .string({ required_error: "El codigo del procedimiento es necesario" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message:
          "El codigo del procedimiento no debe contener palabras reservadas de SQL",
      })
      .regex(/^\d+$/, "El codigo del procedimiento debe de ser positivo")
      .transform((str) => Number(str))
      .refine(
        (val) => val > 0,
        "El codigo del procedimiento debe ser positivo"
      ),
  }),
});

//Exportacion de tipos para usarlo en los Request y Response
export type CreateTreatmentBodyType = z.infer<
  typeof CreateTreatmentSchema
>["body"];
export type UpdateTreatmentBodyType = z.infer<
  typeof UpdateTreatmentSchema
>["body"];
export type UpdateTreatmentParamsType = z.infer<
  typeof UpdateTreatmentSchema
>["params"];
