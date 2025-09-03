
import { Router } from 'express';
import { createClientController, getAllClientsController } from '../controllers/client.controller';

import { authMiddleware } from '../middleware/auth.middleware';

const  router = Router();

router.post('/', authMiddleware, createClientController);

router.get('/', authMiddleware, getAllClientsController)

export default router