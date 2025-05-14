export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenPayload {
    userId: number;
    name?: string;
    role?: UserRole;
    purpose?: string;

}

export interface AuthResponse {
    logged: boolean;
    status: string;
    id?: number;
    name?: string;
    role?: UserRole;

}
