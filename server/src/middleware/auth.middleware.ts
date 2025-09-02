import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


declare global{
    namespace Express {
        interface Request {
            user?: any,
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized: NO token provided'})
    }

    const token = authHeaders.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token'})
    }
}