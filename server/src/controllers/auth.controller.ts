import type { Request, Response } from "express";
import {
  getAllUsersServices,
  registerUserService,
  loginUserService,
} from "../services/auth.service";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAlluserController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersServices();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Failed to get users:", error);
    return res
      .json(500)
      .json({ success: false, message: "Internal server error" });
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
