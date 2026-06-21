import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as settingController from '../../controllers/settingController.js';

const router = Router();

router.use(authenticate);

router.get('/', settingController.getSettings);
router.put('/:key', settingController.updateSetting);

export default router;
