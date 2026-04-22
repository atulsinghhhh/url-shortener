import express from 'express';
import { connectRedis } from './utilis/redis';
import cors from 'cors';
import urlsRouter from './routes/urls.route';
import statsRouter from './routes/stats.route';

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use(statsRouter);
app.use(urlsRouter);

connectRedis();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

