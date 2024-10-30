import { Router } from "express";
import {
  CreateProcedureSchema,
  UpdateProcedureSchema,
} from "../schemas/procedure.schema";
import { schemaValidation } from "../middleware/schemaValidator.middleware";
import {
  createProcedure,
  updateProcedure,
  selectAllProcedures,
} from "../controllers/procedure.controller";
import { authReceptionistRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.get("/list", authReceptionistRequired, selectAllProcedures);
router.post(
  "/create",
  authReceptionistRequired,
  schemaValidation(CreateProcedureSchema),
  createProcedure
);
router.put(
  "/update/:cod_procedimiento",
  authReceptionistRequired,
  schemaValidation(UpdateProcedureSchema),
  updateProcedure
);

export default router;
