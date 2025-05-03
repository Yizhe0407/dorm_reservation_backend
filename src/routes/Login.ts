// File: src/routes/Login.ts
import { Router, RequestHandler } from 'express';
import { login } from '../controllers/AuthController';

const router = Router();

router.post('/login', login);

export default router;