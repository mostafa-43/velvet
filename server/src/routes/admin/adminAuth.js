import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as authController from '../../controllers/authController.js';

const router = Router();

router.use(authenticate);

router.put('/password', authController.updatePassword);

export default router;
