import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createInvoiceController } from "../controllers/invoice.controller";
import { getAllInvoicesController } from "../controllers/invoice.controller";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createInvoiceController)
  .get(authMiddleware, getAllInvoicesController);

export default router;


