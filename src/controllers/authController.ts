import { Request, Response } from 'express';
import admin from '../config/firebase';

// POST /api/auth/register
// Creates a new user in Firebase with email + password
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try {
        const userRecord = await admin.auth().createUser({ email, password });

        res.status(201).json({
            message: 'User created successfully',
            uid: userRecord.uid,
            email: userRecord.email,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/auth/me
// Returns the currently logged-in user's info from the token
// (authMiddleware must run before this — it puts the user on req.user)
export const me = (req: Request, res: Response) => {
    res.json({
        uid: req.user?.uid,
        email: req.user?.email,
    });
};



