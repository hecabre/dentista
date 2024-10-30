import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    user: z
      .string({ required_error: "El usuario es necesario" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message: "El identificador no debe contener palabras reservadas de SQL",
      }),
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .regex(/^(?!.*\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b).*$/i, {
        message: "El identificador no debe contener palabras reservadas de SQL",
      }),
  }),
});

export type LoginBodyType = z.infer<typeof LoginSchema>["body"];
