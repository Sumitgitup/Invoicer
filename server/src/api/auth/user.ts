

import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware';
import { getAlluserController, loginUserController, registerUserController } from '../../controllers/auth.controller';
import { registerUserSchema } from '../../validations/auth.validation';

const router = Router();

router.get(
    '/users',
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