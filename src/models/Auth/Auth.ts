export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenPayload {
    userId: number;
    name?: string;
    role?: UserRole;
    email?: string;
    purpose?: string;
    token_version: number;
}

export interface loginResult {
    logged: boolean;
    status: string;
    id?: number;
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
