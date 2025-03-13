import { Request, Response } from "express";
import User from "../models/userRegisterDto";
import userRegisterService from "../services/User_register_service";

let register = async (req: Request, res: Response) : Promise<any> =>{
    try{
        const{
            first_name,
            last_name,
            email,
            phone_number,
            password,
        } = req.body;
        const userRegister = await userRegisterService.register(new User(first_name, last_name, email, phone_number, password))
        return res.status(201).json(
            {status: '¡USUARIO REGISTRADO CORRECTAMENTE!'}
        );
    }catch (error: any){
        if (error && error.code == "ER_DUP_ENTRY"){
            return res.status(500).json({errorInfo: error.sqlMessage});
        }
    }
}
export default register;