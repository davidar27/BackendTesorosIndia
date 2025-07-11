export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenData {
    userId: number;
    name?: string;
    role?: UserRole;
    email?: string;
    experience_id?: number;
    image?: string;
    address?: string;
}

export interface TokenPayload {
    data: TokenData;
    jti: string;
    token_version: number;
    purpose?: string;
}

export interface loginResult {
    logged: boolean;
    status: string;
    userId?: number;
    role?: string;
    name?: string;
    address?: string;
    token_version?: number;
    experience_id?: number;
    image?: string;
    message?: string;
    errorType?: string;
    redirectTo?: string;
}

export interface PasswordResetPayload {
    userId: number;
    purpose: string;
}
