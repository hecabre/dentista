import { Router } from "express";
import { schemaValidation } from "../middleware/schemaValidator.middleware";
import {
  CreateTreatmentSchema,
  UpdateTreatmentSchema,
} from "../schemas/treatmient.schema";
import {
  createTreatment,
  updateTreatment,
  selectTreatment,
} from "../controllers/treatmeat.controller";
import { authRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.get("/list", authRequired, selectTreatment);
router.post(
  "/create",
  authRequired,
  schemaValidation(CreateTreatmentSchema),
  createTreatment
);
router.put(
  "/update/:fecha/:pacientes_telefono",
  authRequired,
  schemaValidation(UpdateTreatmentSchema),
  updateTreatment
);

export default router;
