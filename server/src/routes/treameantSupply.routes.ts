import { Router } from "express";
import { schemaValidation } from "../middleware/schemaValidator.middleware";
import { CreateTreatmentSupplySchema } from "../schemas/treatmientSupply.schema";
import { SelectSchema } from "../schemas/select.schema";
import {
  createTreatmeantSupply,
  updateTreatmeantSupply,
  selectAllTreatmeantSupply,
} from "../controllers/treatmeantSupply.controller";
import { authRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.get("/list", authRequired, selectAllTreatmeantSupply);
router.post(
  "/create",
  authRequired,
  schemaValidation(CreateTreatmentSupplySchema),
  createTreatmeantSupply
);
router.put(
  "/update/:id_suministro",
  authRequired,
  schemaValidation(CreateTreatmentSupplySchema),
  updateTreatmeantSupply
);

export default router;
