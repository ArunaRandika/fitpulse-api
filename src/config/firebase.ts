import admin from 'firebase-admin';
import path from 'path';

// serviceAccountKey.json lives at the project root (one level above src/)
const serviceAccount = require(path.resolve(__dirname, '../../serviceAccountKey.json'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;

