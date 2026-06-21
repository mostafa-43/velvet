import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as brandController from '../../controllers/brandController.js';

const router = Router();

router.use(authenticate);

router.post('/', brandController.createBrand);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);
router.get('/:id', brandController.getBrandById);

export default router;
