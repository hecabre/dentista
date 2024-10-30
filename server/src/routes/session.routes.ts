import {
  loginDoctor,
  loginReceptionist,
  logout,
  verifyToken,
} from "../controllers/session.controller";
import { schemaValidation } from "../middleware/schemaValidator.middleware";
import { LoginSchema } from "../schemas/session.schema";
import { Router } from "express";

const router = Router();

router.post("/login/doctor", schemaValidation(LoginSchema), loginDoctor);
router.post(
  "/login/receptionist",
  schemaValidation(LoginSchema),
  loginReceptionist
);
router.get("/logout", logout);
router.get("/verify-token", verifyToken);

export default router;
