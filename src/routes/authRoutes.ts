import { Router } from 'express';
import { register, me } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// POST /api/auth/register — no token needed, anyone can register
router.post('/register', register);

// GET /api/auth/me — protected, must have a valid token
router.get('/me', authMiddleware, me);

export default router;

