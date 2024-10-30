import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

export const CreateTreatmentSupplySchema = z.object({
  body: z.object({
    cita_empleado_numss: z.number({
      required_error: "El número de seguridad social del empleado es necesario",
      invalid_type_error: "El número de seguridad social debe ser un número",
    }),
    cita_fecha: z
      .string({
        required_error: "La fecha de la cita es necesaria",
        invalid_type_error: "La fecha debe ser un texto",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    cita_hora: z
      .string({
        required_error: "La hora es necesaria",
        invalid_type_error: "La hora debe ser un texto",
      })
      .refine(
        (val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), // Validación de formato HH:MM
        {
          message: "La hora debe estar en el formato HH:MM (24 horas).",
        }
      )
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La hora contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    procedimiento_cod_procedimiento: z
      .number({
        required_error: "El código del procedimiento es necesario",
        invalid_type_error: "El código del procedimiento debe ser un número",
      })
      .refine((value) => !sqlInjectionRegex.test(value.toString()), {
        message:
          "El código del procedimiento contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
  }),
});
export const SelectTreatmentSupplySchema = z.object({
  body: z.object({
    cita_empleado_numss: z.number({
      required_error: "El número de seguridad social del empleado es necesario",
      invalid_type_error: "El número de seguridad social debe ser un número",
    }),
    cita_fecha: z
      .string({
        required_error: "La fecha de la cita es necesaria",
        invalid_type_error: "La fecha debe ser un texto",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    cita_hora: z
      .string({
        required_error: "La hora es necesaria",
        invalid_type_error: "La hora debe ser un texto",
      })
      .refine(
        (val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), // Validación de formato HH:MM
        {
          message: "La hora debe estar en el formato HH:MM (24 horas).",
        }
      )
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "La hora contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
  }),
});
// Exportación de tipos para usarlo en los Request y Response
export type CreateTreatmentSupplyBodyType = z.infer<
  typeof CreateTreatmentSupplySchema
>["body"];
export type SelectTreatmentSupplyBodyType = z.infer<
  typeof SelectTreatmentSupplySchema
>["body"];
