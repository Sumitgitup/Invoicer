
import { Router } from 'express';
import { createClientController } from '../controllers/client.controller';

import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createClientController);


export default router