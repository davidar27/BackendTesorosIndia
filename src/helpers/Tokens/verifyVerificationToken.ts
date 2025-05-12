import { verifyToken } from './verifyToken';
import { VERIFICATION_TOKEN_SECRET } from './TokenSecrets';
import { UserRole } from '../../models/Auth/Auth';

export const verifyEmailVerificationToken = (
    token: string
    
): { userId: number } => {
    const payload = verifyToken<{ userId: number; role: UserRole; purpose: string }>(
        token,
        VERIFICATION_TOKEN_SECRET
    );
    console.log(payload);
    

    /* if (payload.purpose !== 'email_verification') {
        throw new Error('Token no válido para verificación de email');
    }else{
        console.log("TOKEN VALIDO PARA VERIFICAR EMAIL");
        
    } */
    console.log(payload.userId);
    
    return { userId: payload.userId };
};

