import { schemaValidation } from "../middleware/schemaValidator.middleware";
import { CreateDateSchema, UpdateDateSchema } from "../schemas/date.schema";
import { SelectSchema } from "../schemas/select.schema";
import {
  createDate,
  updateDate,
  selectAllDates,
  selectDateByNumSS,
} from "../controllers/date.controller";
import { Router } from "express";
import { authReceptionistRequired } from "../middleware/authRequired.middleware";

const router = Router();

router.post(
  "/create",
  authReceptionistRequired,
  schemaValidation(CreateDateSchema),
  createDate
);
router.get("/list", authReceptionistRequired, selectAllDates);
router.get(
  "/list/:id",
  authReceptionistRequired,
  schemaValidation(SelectSchema),
  selectDateByNumSS
);
router.put(
  "/update/:empleado_numss",
  authReceptionistRequired,
  schemaValidation(UpdateDateSchema),
  updateDate
);

export default router;
