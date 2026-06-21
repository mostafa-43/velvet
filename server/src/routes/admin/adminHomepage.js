import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as homepageController from '../../controllers/homepageController.js';

const router = Router();

router.use(authenticate);

router.put('/sections/:id', homepageController.updateSection);

export default router;
