export type UserRole = "cliente" | "administrador" | "emprendedor";

export interface TokenPayload {
    userId: number;
    name?: string;
    role?: UserRole;
    purpose?: string;

}

export interface loginResult {
    logged: boolean;
    status: string;
    id?: number;
    role?: string;
    name?: string;
    message?: string;
    errorType?: string;
    redirectTo?: string;
}
