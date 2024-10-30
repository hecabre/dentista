import { schemaValidation } from "../middleware/schemaValidator.middleware";
import { CreateProcedureDateSchema } from "../schemas/procedureDate.schema";
import {
  createProcedureDate,
  updateProcedureDate,
  selectAllProcedureDate,
  selectProcedureDateByNumSS,
} from "../controllers/procedureDate.controller";
import { SelectSchema } from "../schemas/select.schema";
import { Router } from "express";
import { authRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.get("/list", authRequired, selectAllProcedureDate);
router.get(
  "/list/:id",
  authRequired,
  schemaValidation(SelectSchema),
  selectProcedureDateByNumSS
);
router.post(
  "/create",
  authRequired,
  schemaValidation(CreateProcedureDateSchema),
  createProcedureDate
);
router.put(
  "/update",
  authRequired,
  schemaValidation(CreateProcedureDateSchema),
  updateProcedureDate
);

export default router;
