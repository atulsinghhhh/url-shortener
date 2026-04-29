import express from 'express';
import { connectRedis } from './utilis/redis';
import cors from 'cors';
import urlsRouter from './routes/urls.route';
import statsRouter from './routes/stats.route';

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get("/health",(req,res)=>{
    res.send("ok")
})
// Routes
app.use(statsRouter);
app.use(urlsRouter);

connectRedis();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

