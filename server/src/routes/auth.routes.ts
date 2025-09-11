
import { Router } from "express";
import {
  getMeController,
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { registerUserSchema } from "../validations/auth.validation";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Get the currently logged-in user's profile
router.get(
  "/me",
  authMiddleware, // This route must be protected
  getMeController
);

router.post("/register", validate(registerUserSchema), registerUserController);
router.post("/login", loginUserController);

export default router;
