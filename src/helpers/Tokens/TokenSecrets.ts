import { config } from '../../config/token';

export const ACCESS_TOKEN_SECRET = config.JWT_ACCESS_SECRET;
export const REFRESH_TOKEN_SECRET = config.JWT_REFRESH_SECRET;
export const VERIFICATION_TOKEN_SECRET = config.JWT_VERIFICATION_SECRET;
export const PASSWORD_RESET_SECRET = config.JWT_PASSWORD_RESET_SECRET;
