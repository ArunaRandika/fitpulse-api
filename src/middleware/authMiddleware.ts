import {NextFunction, Request, Response} from 'express';
import admin from '../config/firebase';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or malformed Authorization header' });
        return;
    }

    const token = authHeader.split('Bearer ')[1]?.trim();

    if (!token) {
        res.status(401).json({ message: 'Token is empty or malformed' });
        return;
    }

    const jwtParts = token.split('.');
    if (jwtParts.length !== 3) {
        res.status(401).json({ message: `Malformed token — expected 3 JWT parts, got ${jwtParts.length}` });
        return;
    }

    try {
        req.user = await admin.auth().verifyIdToken(token);
        next();
    } catch (error: any) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
