import { z } from "zod";

export const SelectSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: "El identificador es necesario" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message: "El identificador no debe contener palabras reservadas de SQL",
      })
      .regex(/^\d+$/, "El identificador debe de ser positivo")
      .transform((str) => Number(str))
      .refine((val) => val > 0, "El identificador debe ser positivo"),
  }),
});

export const SelectNameSchema = z.object({
  body: z.object({
    nombre: z
      .string({
        invalid_type_error: "El nombre debe de ser un texto",
        required_error: "El nombre es requerido",
      })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message: "El nombre no debe contener palabras reservadas de SQL",
      }),
  }),
});

export type SelectParamsType = z.infer<typeof SelectSchema>["params"];
