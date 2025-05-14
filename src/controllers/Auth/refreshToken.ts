// import { REFRESH_TOKEN_SECRET } from "../../helpers/Tokens/TokenSecrets";
// import { verifyTokenPayload } from "../../helpers/Tokens/verifyTokenPayload";
// import 


// export const refreshTokenController = async (req: Request, res: Response) => {
//     try {
//         const refreshToken = req.cookies.refresh_token;
//         if (!refreshToken) return res.status(401).json({ error: 'Refresh token requerido' });

//         // Verificar y decodificar refresh token
//         const payload = verifyTokenPayload(refreshToken, REFRESH_TOKEN_SECRET);

//         // Verificar que el token exista en la base de datos
//         const tokenExists = await TokenService.verifyRefreshToken(payload.userId, refreshToken);
//         if (!tokenExists) return res.status(401).json({ error: 'Refresh token inválido' });

//         // Generar nuevo access token
//         const newAccessToken = generateAccessToken(payload.userId, payload.role);

//         // Opcional: Rotar el refresh token (patrón más seguro)
//         const newRefreshToken = generateRefreshToken(payload.userId);
//         await TokenService.replaceRefreshToken(refreshToken, newRefreshToken);

//         // Enviar nuevos tokens
//         res.cookie('access_token', newAccessToken, { /* config */ });
//         res.cookie('refresh_token', newRefreshToken, { /* config */ });

//         return res.json({ success: true });
//     } catch (error) {
//         return res.status(401).json({ error: 'Token inválido' });
//     }
// };