import { Request, Response } from 'express';
import admin from '../config/firebase';
import axios from 'axios';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try {
        const userRecord = await admin.auth().createUser({ email, password });

        const apiKey = process.env.FIREBASE_WEB_API_KEY;
        const signInResponse = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            { email, password, returnSecureToken: true }
        );

        const { idToken, refreshToken, expiresIn } = signInResponse.data;

        res.status(201).json({
            message: 'User created successfully',
            uid: userRecord.uid,
            email: userRecord.email,
            idToken,
            refreshToken,
            expiresIn,
        });
    } catch (error: any) {
        const message = error?.response?.data?.error?.message ?? error.message;
        res.status(400).json({ message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try {
        const apiKey = process.env.FIREBASE_WEB_API_KEY;
        const signInResponse = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            { email, password, returnSecureToken: true }
        );

        const { idToken, refreshToken, expiresIn } = signInResponse.data;

        res.status(200).json({ idToken, refreshToken, expiresIn });
    } catch (error: any) {
        const message = error?.response?.data?.error?.message ?? error.message;
        res.status(401).json({ message });
    }
};

export const me = (req: Request, res: Response) => {
    res.json({
        uid: req.user?.uid,
        email: req.user?.email,
    });
};
