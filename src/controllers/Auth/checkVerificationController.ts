import { User } from "../../models/User/User";
import { Request, Response } from "express";
import { findByEmailUserService } from "../../services/User/findByEmailUserService";


export const checkVerification = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const user = await findByEmailUserService(email as string);

        if (!user) {
            return res.status(404).json({ isVerified: false });
        }

        return res.json({ isVerified: user.verified });
    } catch (error) {
        return res.status(500).json({ error: 'Error al verificar el estado' });
    }
}