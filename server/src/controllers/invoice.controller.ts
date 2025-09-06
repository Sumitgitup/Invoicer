
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createInvoiceService, getAllInvoiceService } from '../services/invoice.service';
import { success } from 'zod';

export const createInvoiceController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    const invoice = await createInvoiceService(req.body, req.user.id);
    res.status(201).json({ success: true, data: invoice});
})


export const getyAllInvoicesController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    const invoices = await getAllInvoiceService(req.user.id);
    res.status(200).json({ success: true, data: invoices})
})