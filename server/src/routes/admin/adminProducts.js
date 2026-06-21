import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as productController from '../../controllers/productController.js';

const router = Router();

router.use(authenticate);

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
