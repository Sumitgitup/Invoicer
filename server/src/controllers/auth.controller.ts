
import asyncHandler from 'express-async-handler';
import type { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  getMeService
} from "../services/auth.service";


export const getMeController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    // You can set a status and throw an error, 
    // and the error middleware will handle it.
    res.status(401);
    throw new Error('Unauthorized');
  }
  const user = await getMeService(req.user.id);
  res.status(200).json({ success: true, data: user });
});


export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  // No more try...catch!
  const result = await registerUserService(req.body);
  res.status(201).json({ success: true, data: result });
});

export const loginUserController = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUserService(req.body);
  res.status(200).json({ success: true, data: result });
});


