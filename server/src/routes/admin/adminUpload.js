import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';
import * as uploadController from '../../controllers/uploadController.js';

const router = Router();

router.use(authenticate);

router.post('/', upload.single('file'), uploadController.uploadFile);
router.post('/multiple', upload.array('files', 10), uploadController.uploadMultiple);

export default router;
