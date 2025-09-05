import type { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  getMeService
} from "../services/auth.service";

export const getMeController = async (req: Request, res: Response) => {
  try {
    // req.user is attached by the authMiddleware
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const user = await getMeService(req.user.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    return res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    const statusCode = error.message.includes('exists') ? 409 : 400;
    return res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const result = await loginUserService(req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(401).json({success: false, message: error.message})
  }
};