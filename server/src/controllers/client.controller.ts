import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; // 1. Import asyncHandler
import {
  createClientService,
  getAllClientsService,
  getClientByIdService,
  deleteClientService,
  updateClientService,
} from "../services/client.service";
import { Client } from "../models/client.model";
import { success } from "zod";

export const createClientController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const client = await createClientService(req.body, req.user.id);
    res.status(201).json({ success: true, data: client });
  }
);

export const getAllClientsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const searchQuery = req.query.search as string | undefined;
    const clients = await getAllClientsService(req.user.id, searchQuery);
    res.status(200).json({ success: true, data: clients });
  }
);

export const getClientByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unathorized");
    }

    const client = await getClientByIdService(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: client });
  }
);

export const updateClientController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error();
    }
    const client = await updateClientService(
      req.params.id,
      req.user.id,
      req.body
    );
    res.status(200).json({ success: true, data: client });
  }
);

export const deleteClientController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const result = await deleteClientService(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: result });
  }
);
