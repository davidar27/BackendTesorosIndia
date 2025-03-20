import { Request, Response } from "express";
import userAuth from "../../dto/authDto";
import authService from "../../services/authService";
import tokenGenerator from "../../helpers/tokenGenerator";
import dotenv from "dotenv";
dotenv.config();

let authController = async (req: Request, res: Response) : Promise<any>  => {
    try {
        const { 
            email, password 
        } = req.body;
        const login = await authService.login(new userAuth(email, password));
        if (login.logged) {
            return res.status(200).json({
                status: login.status,
                token: tokenGenerator({ id_user: login.id, role: login.role }, process.env.KEY_TOKEN, 60)
            });
        }
        return res.status(401).json({
            status: login.status
        });
    }
    catch (error) {
        console.log(error);
    }
}

export default authController;