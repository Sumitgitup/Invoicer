
import { Request, Response } from 'express';
import { createClientService, getAllClientsService } from '../services/client.service';



export const createClientController = async(req: Request, res: Response) => {
    try {
        const client = await createClientService(req.body, req.user.id)
        return res.status(201).json({success: true, data: client})
    } catch (error: any) {
        return res.status(409).json({success: false, message: error.message})        
    }
}

export const getAllClientsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    // Get the search term from the URL query string (e.g., /clients?search=corp)
    const searchQuery = req.query.search as string | undefined;

    const clients = await getAllClientsService(userId, searchQuery);
    
    return res.status(200).json({ success: true, data: clients });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};