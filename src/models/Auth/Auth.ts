export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenData {
    userId: number;
    name?: string;
    role?: UserRole;
    email?: string;
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
    token_version?: number;
    message?: string;
    errorType?: string;
    redirectTo?: string;
}

export interface PasswordResetPayload {
    userId: number;
    purpose: string;
}
