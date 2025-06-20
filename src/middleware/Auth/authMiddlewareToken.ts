import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface Data {
    userId: number;
    role: "cliente" | "administrador" | "emprendedor";
    experience_id?: number;
    image?: string;
}

interface JwtPayload {
    data: Data;
    exp: number;
    iat: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: Data;
        }
    }
}

export const authMiddlewareToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenKey = process.env.JWT_ACCESS_SECRET;

    if (!tokenKey) {
        return res.status(500).json({ message: "Token key is not set in environment variables" });
    }

    const authorization = req.header('Authorization');
    let token: string | undefined;

    if (authorization && authorization.startsWith("Bearer ")) {
        token = authorization.split(' ')[1];
    }

    if (!token) {
        token = req.cookies?.access_token
    }

    if (!token) {
        return res.status(403).json({
            message: "Access token is required. Provide it via Authorization header (Bearer <token>) or cookie."
        });
    }

    try {
        const decoded = jwt.verify(token, tokenKey) as JwtPayload;

        req.user = decoded.data;

        req.body.userId = decoded.data.userId;
        req.body.role = decoded.data.role;

        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired",
                error: error.message,
                redirectTo: "/iniciar-sesion"
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                message: "Invalid token",
                error: error.message
            });
        }

        return res.status(403).json({
            message: "Unauthorized",
            error: error.message
        });
    }
};

export const requireRole = (allowedRoles: Array<"cliente" | "administrador" | "emprendedor">) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required roles: ${allowedRoles.join(', ')}. Your role: ${req.user.role}`
            });
        }

        next();
    };
};