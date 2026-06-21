import { Router } from 'express';
import * as bannerController from '../controllers/bannerController.js';

const router = Router();

router.get('/', bannerController.getBanners);

export default router;
