
import { Request, Response } from 'express';
import { createClientService } from '../services/client.service';



export const createClientController = async(req: Request, res: Response) => {
    try {
        const client = await createClientService(req.body, req.user.id)
        return res.status(201).json({success: true, data: client})
    } catch (error: any) {
        return res.status(409).json({success: false, message: error.message})        
    }
}