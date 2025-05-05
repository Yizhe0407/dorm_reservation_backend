import { Router } from 'express';
import { getProfile } from '../../controllers/AuthController';

const router = Router();

router.get('/me', getProfile);

export default router;