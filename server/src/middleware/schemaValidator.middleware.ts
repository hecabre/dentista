import { NextFunction, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError)
        return res.status(400).json(
          error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path,
          }))
        );
      return res.status(400).json({ message: "Error en el servidor" });
    }
  };
