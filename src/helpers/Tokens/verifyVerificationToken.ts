import { verifyTokenPayload } from '@/helpers/Tokens/verifyTokenPayload';
import { VERIFICATION_TOKEN_SECRET } from '@/helpers/Tokens/TokenSecrets';
import { TokenPayload } from '@/models/Auth/Auth';

export const verifyEmailVerificationToken = (token: string): { userId: number } => {
    const data = verifyTokenPayload<TokenPayload>(
        token,
        VERIFICATION_TOKEN_SECRET,
        {
            requirePurpose: 'email_verification',
            requireTokenVersion: 1
        }
    );
    return { userId: data.data.userId };
};

