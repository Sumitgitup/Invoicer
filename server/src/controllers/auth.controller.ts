

import type{ Request, Response } from 'express';
import { registerUserService } from '../services/auth.service';

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};