import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/AuthController';

interface AuthRequest extends Request {
    userId?: number;
}

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;