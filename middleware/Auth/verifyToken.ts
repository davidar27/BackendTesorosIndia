import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface Data {
    identityNumber: number,
    role: "cliente" | "administrador" | "emprendedor"
}

interface JwtPayload {
    data: Data,
    exp: number,
    iat: number
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    let authorization = req.header('Authorization');

    if (!authorization) {
        return res.status(403).json(
            { status: "The Authorization header is required" }
        );
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json(
            { status: 'You have not sent a token' }
        );
    }

    try {
        let decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as JwtPayload;
        req.body.identityNumber = decoded.data.identityNumber;
        req.body.role = decoded.data.role;
        next();
    } catch (error) {
        return res.status(403).json(
            { status: 'Unauthorized' }
        );
    }
}

