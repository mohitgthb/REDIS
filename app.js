import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use('/', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});