import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

//Json para actualziar y crear un procedimiento cita en la db
export const CreateProcedureDateSchema = z.object({
  body: z.object({
    cita_empleado_numss: z.number({
      required_error: "El numero de seguridad social es necesario",
      invalid_type_error: "El numero de seguridad social debe de ser un numero",
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
    cod_procedimiento: z.number({
      required_error: "El codigo del procedimiento es necesario",
      invalid_type_error: "El codigo del procedimiento debe de ser un numero",
    }),
  }),
});

//Exportacion de tipos para usarlo en los Request y Response
export type CreateProcedureDateBodyType = z.infer<
  typeof CreateProcedureDateSchema
>["body"];
