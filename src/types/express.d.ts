import { DecodedIdToken } from 'firebase-admin/auth';

// Extend Express's Request interface globally so req.user is available
// in every route and middleware file without extra imports.
declare global {
    namespace Express {
        interface Request {
            user?: DecodedIdToken;
        }
    }
}

export {};

