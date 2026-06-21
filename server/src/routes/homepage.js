import { Router } from 'express';
import * as homepageController from '../controllers/homepageController.js';

const router = Router();

router.get('/sections', homepageController.getSections);

export default router;
