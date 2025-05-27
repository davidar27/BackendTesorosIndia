// models/AuthError.ts
class AuthError extends Error {
    status: number;
    errorType: string;
    redirectTo?: string;
    details?: Record<string, string>;

    constructor(message: string, {
        status = 500,
        errorType = 'server',
        redirectTo,
        details
    }: {
        status?: number;
        errorType?: string;
        redirectTo?: string;
        details?: Record<string, string>;
    } = {}) {
        super(message);
        this.name = 'AuthError';
        this.status = status;
        this.errorType = errorType;
        this.redirectTo = redirectTo;
        this.details = details;

        // Extiende correctamente Error
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

export default AuthError;
