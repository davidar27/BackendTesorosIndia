import express from 'express'
import User_register_validador from '../middleware/User_register_validador';
import register from '../controllers/User_register_controller';


const router = express.Router();


router.post('/User_register', User_register_validador.validatorParam, User_register_validador.validator, register );
export default router;