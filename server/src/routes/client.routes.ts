
import { Router } from 'express';
import { 
    createClientController,
    deleteClientController, 
    getAllClientsController, 
    getClientByIdController, 
    updateClientController } from '../controllers/client.controller';

import { authMiddleware } from '../middleware/auth.middleware';

const  router = Router();

router.route('/')
  .post(authMiddleware, createClientController)
  .get(authMiddleware, getAllClientsController);

// Routes for a specific item (/api/clients/:id)
router.route('/:id')
  .get(authMiddleware, getClientByIdController)
  .put(authMiddleware, updateClientController)
  .delete(authMiddleware, deleteClientController);

export default router;
