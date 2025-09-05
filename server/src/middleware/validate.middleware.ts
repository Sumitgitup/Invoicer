import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod'; // Use ZodObject for better flexibility

export const validate = (schema: ZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // THE FIX: Pass an object that matches the schema's shape
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};
