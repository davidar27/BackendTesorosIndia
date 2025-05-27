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

// Extender el tipo Request para incluir user
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

    // Buscar token en header Authorization
    const authorization = req.header('Authorization');
    let token: string | undefined;

    if (authorization && authorization.startsWith("Bearer ")) {
        token = authorization.split(' ')[1];
    }

    // Si no hay token en el header, buscar en cookies
    if (!token) {
        // Buscar en diferentes nombres de cookies comunes
        token = req.cookies?.authToken ||
            req.cookies?.access_token ||
            req.cookies?.token ||
            req.cookies?.accessToken;
    }

    // Si aún no hay token, devolver error
    if (!token) {
        return res.status(403).json({
            message: "Access token is required. Provide it via Authorization header (Bearer <token>) or cookie."
        });
    }

    try {
        const decoded = jwt.verify(token, tokenKey) as JwtPayload;

        // Mejor práctica: usar req.user en lugar de req.body
        req.user = decoded.data;

        // Mantener compatibilidad con código existente si es necesario
        req.body.userId = decoded.data.userId;
        req.body.role = decoded.data.role;

        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired",
                error: error.message,
                redirectTo: "/login"
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

// Middleware opcional para rutas que requieren roles específicos
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