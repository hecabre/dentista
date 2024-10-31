import { z } from "zod";
import { sqlInjectionRegex } from "../const/sql";

// Json para crear los suministros
export const CreateSupplySchema = z.object({
  body: z.object({
    nombre: z
      .string({
        required_error: "El nombre es necesario",
        invalid_type_error: "El nombre debe de ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El nombre contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    cantidad: z.number({
      required_error: "La cantidad es necesaria",
      invalid_type_error: "La cantidad debe ser un número",
    }),
    caducidad: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !value || !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    estado: z
      .string({
        invalid_type_error: "El estado debe ser un texto",
      })
      .optional()
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El estado contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    id_suministro: z.number({
      required_error: "El id_suministro es necesario",
      invalid_type_error: "El id_suministro debe ser un número",
    }),
    vigente: z.enum(["1", "0"], {
      required_error: "La vigencia es necesaria",
      invalid_type_error: "La vigencia debe ser 1 o 0",
    }),
  }),
});

// Json para la actualización de los suplementos
export const UpdateSupplySchema = z.object({
  body: z.object({
    nombre: z
      .string({
        required_error: "El nombre es necesario",
        invalid_type_error: "El nombre debe ser un texto",
      })
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El nombre contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    cantidad: z.number({
      required_error: "La cantidad es necesaria",
      invalid_type_error: "La cantidad debe ser un número",
    }),
    caducidad: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "La fecha debe estar en un formato válido",
      })
      .refine((value) => !value || !sqlInjectionRegex.test(value), {
        message:
          "La fecha contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    estado: z
      .string({
        invalid_type_error: "El estado debe ser un texto",
      })
      .optional()
      .refine((value) => !sqlInjectionRegex.test(value), {
        message:
          "El estado contiene caracteres no permitidos que podrían causar inyecciones SQL.",
      }),
    vigente: z.enum(["1", "0"], {
      required_error: "La vigencia es necesaria",
      invalid_type_error: "La vigencia debe ser 1 o 0",
    }),
  }),
  params: z.object({
    id_suministro: z
      .string({ required_error: "El id del suministro es necesario" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message:
          "El id del suministro no debe contener palabras reservadas de SQL",
      })
      .transform((str) => Number(str))
      .refine((val) => val > 0, "El id del suministro debe ser positivo"),
  }),
});

// Exportación de tipos para usarlo en los Request y Response
export type CreateSupplyBodyType = z.infer<typeof CreateSupplySchema>["body"];
export type UpdateSupplyBodyType = z.infer<typeof UpdateSupplySchema>["body"];
export type UpdateSupplyParamsType = z.infer<
  typeof UpdateSupplySchema
>["params"];
