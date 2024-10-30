import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

//Json para crear un procedimiento en la db
export const CreateProcedureSchema = z.object({
  body: z.object({
    monto: z.number({
      required_error: "El monto es requerido",
      invalid_type_error: "El monto debe de ser un numero",
    }),
    procedimiento: z
      .string({
        required_error: "El procedimiento debe de ser un texto",
        invalid_type_error: "El procedimiento debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    cod_procedimiento: z.number({
      required_error: "El codigo del procedimiento es requerido",
      invalid_type_error: "El codigo del procedimiento debe de ser un numero",
    }),
  }),
});

//Json para actualizar un procedimiento en la db
export const UpdateProcedureSchema = z.object({
  body: z.object({
    monto: z.number({
      required_error: "El monto es requerido",
      invalid_type_error: "El monto debe de ser un numero",
    }),
    procedimiento: z
      .string({
        required_error: "El procedimiento debe de ser un texto",
        invalid_type_error: "El procedimiento debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
  }),
  params: z.object({
    cod_procedimiento: z
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
export type CreateProcedureBodyType = z.infer<
  typeof CreateProcedureSchema
>["body"];
export type UpdateProcedureBodyType = z.infer<
  typeof UpdateProcedureSchema
>["body"];
export type UpdateProcedureParamsType = z.infer<
  typeof UpdateProcedureSchema
>["params"];
