import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as newsletterController from '../../controllers/newsletterController.js';

const router = Router();

router.use(authenticate);

router.get('/', newsletterController.getSubscribers);

export default router;
