import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as bannerController from '../../controllers/bannerController.js';

const router = Router();

router.use(authenticate);

router.post('/', bannerController.createBanner);
router.put('/:id', bannerController.updateBanner);
router.delete('/:id', bannerController.deleteBanner);

export default router;
