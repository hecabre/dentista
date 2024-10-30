import { Router } from "express";
import {
  createPatient,
  updatePatient,
  selectAllPatient,
  selectPatientByPhone,
} from "../controllers/patient.controller";
import { schemaValidation } from "../middleware/schemaValidator.middleware";
import {
  CreatePatientSchema,
  UpdatePatientSchema,
} from "../schemas/patient.schema";
import { SelectSchema } from "../schemas/select.schema";
import { authRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.post(
  "/create",
  authRequired,
  schemaValidation(CreatePatientSchema),
  createPatient
);
router.get("/list", authRequired, selectAllPatient);
router.get(
  "/list/:id",
  authRequired,
  schemaValidation(SelectSchema),
  selectPatientByPhone
);
router.put(
  "/update/:telefono",
  authRequired,
  schemaValidation(UpdatePatientSchema),
  updatePatient
);

export default router;
