import 'dotenv/config';
import express from 'express';
import healthRoutes from "./routes/healthRoutes";
import exerciseRoutes from './routes/exerciseRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Parse incoming JSON request bodies (needed for register — email/password)
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
