import { Router } from 'express';
import adminController from '../controllers/adminController';

const router = Router();

router.get('/status', adminController.getStatus);

export default router;
