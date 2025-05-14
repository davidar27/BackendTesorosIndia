import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface Data {
    userId: number;
    role: "cliente" | "administrador" | "emprendedor";
}

interface JwtPayload {
    data: Data;
    exp: number;
    iat: number;
}

export const authMiddlewareToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenKey = process.env.JWT_ACCESS_SECRET;

    if (!tokenKey) {
        return res.status(500).json({ message: "Token key is not set in environment variables" });
    }

    const authorization = req.header('Authorization');

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header is required and must start with 'Bearer '" });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "You have not sent a token" });
    }

    try {
        const decoded = jwt.verify(token, tokenKey) as JwtPayload;

        req.body.userId = decoded.data.userId;
        req.body.role = decoded.data.role;

        next();
    } catch (error: any) {
        return res.status(403).json({ message: "Unauthorized", error: error.message });
    }
};
