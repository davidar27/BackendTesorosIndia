export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenPayload {
    userId: number;
    role?: UserRole;
    purpose?: string;

}

export interface AuthResponse {
    logged: boolean;
    status: string;
    id?: number;
    role?: UserRole;
}
