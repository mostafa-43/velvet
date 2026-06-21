import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as contactController from '../../controllers/contactController.js';

const router = Router();

router.use(authenticate);

router.get('/', contactController.getMessages);
router.get('/:id', contactController.getMessage);
router.delete('/:id', contactController.deleteMessage);

export default router;
