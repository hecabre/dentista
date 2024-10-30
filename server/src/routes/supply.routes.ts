import { Router } from "express";
import { schemaValidation } from "../middleware/schemaValidator.middleware";
import {
  CreateSupplySchema,
  UpdateSupplySchema,
} from "../schemas/supply.schema";
import {
  createSupply,
  updateSupply,
  selectAllSupply,
} from "../controllers/supply.controller";
import { authRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.get("/list", authRequired, selectAllSupply);
router.post(
  "/create",
  authRequired,
  schemaValidation(CreateSupplySchema),
  createSupply
);
router.put(
  "/update/:id_suministro",
  authRequired,
  schemaValidation(UpdateSupplySchema),
  updateSupply
);

export default router;
