import express from 'express';
import { connectRedis } from './utilis/redis';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

connectRedis();

app.listen(3000, () =>
    console.log("Server running on port 3000")
);