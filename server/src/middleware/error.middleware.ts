import { Request, Response, NextFunction } from "express";
import { success } from "zod";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,

    stack: process.env.NODE_ENV == "production" ? "stack" : err.stack,
  });
};
