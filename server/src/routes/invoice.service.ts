import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createInvoiceController } from "../controllers/invoice.controller";
import { getAllInvoiceService } from "../services/invoice.service";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createInvoiceController)
  .get(authMiddleware, getAllInvoiceService);

export default router;


