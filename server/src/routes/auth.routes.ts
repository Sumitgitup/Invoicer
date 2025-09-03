

import { Router } from 'express';
import { getAlluserController, loginUserController, registerUserController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { registerUserSchema } from '../validations/auth.validation';

const router = Router();

router.get(
    '/me',
    getAlluserController
)

router.post(
    '/register',
    validate(registerUserSchema),
    registerUserController
);
router.post(
    '/login',
    loginUserController
)


export default router;