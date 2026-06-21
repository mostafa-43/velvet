import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as categoryController from '../../controllers/categoryController.js';

const router = Router();

router.use(authenticate);

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
