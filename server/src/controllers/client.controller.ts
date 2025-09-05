import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'; // 1. Import asyncHandler
import { createClientService, getAllClientsService } from '../services/client.service';

export const createClientController = asyncHandler(async(req: Request, res: Response) => {
    if (!req.user) {
         res.status(401);
         throw new Error('Unauthorized');
    }
    const client = await createClientService(req.body, req.user.id);
    res.status(201).json({success: true, data: client});
});

export const getAllClientsController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized');
    }
    const searchQuery = req.query.search as string | undefined;
    const clients = await getAllClientsService(req.user.id, searchQuery);
    res.status(200).json({ success: true, data: clients });
});