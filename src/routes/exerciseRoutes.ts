import { Router } from 'express';
import { getAll, getById, search } from '../controllers/exerciseController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// All exercise routes are protected — valid token required
router.use(authMiddleware);

router.get('/search', search);
router.get('/', getAll);
router.get('/:id', getById);

export default router;

