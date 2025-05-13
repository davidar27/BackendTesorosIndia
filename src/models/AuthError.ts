export interface AuthError {
    error: string;
    details?: Record<string, string>;
}