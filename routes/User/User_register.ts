import express from 'express'
import register_validador from '../../middleware/User/register_validador';
import register from '../../controllers/User/registerController';

const router = express.Router();


router.post('/user_register', register_validador.validatorParam, register_validador.validator, register );
export default router;