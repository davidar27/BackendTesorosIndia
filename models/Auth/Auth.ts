export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenPayload {
    userId: number;
    role: UserRole;
}

export interface AuthResponse {
    logged: boolean;
    status: string;
    id?: number;
    role?: UserRole;
}
