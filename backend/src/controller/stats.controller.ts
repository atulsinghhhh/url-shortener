import { redis } from "../utilis/redis"
import type { Request, Response } from "express";



export const healthCheck = async (_req: Request, res: Response) => {
    const ping = await redis.ping();

    res.json({
        status: "ok",
        server: "running",
        redis: ping === "PONG" ? "connected" : "disconnected",
        uptime: process.uptime(),
    });
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const { shortCode } = req.params;
    
        const urlData = await redis.hgetall<any>(`url:${shortCode}`);
        if (!urlData || !urlData.originalUrl){
            return res.status(404).json({ error: "Not found" });
        }
    
        const clicks = (await redis.get(`clicks:${shortCode}`)) || "0";
    
        const expiresAt = new Date(urlData.expiresAt || "");
    
        const baseUrl = process.env.URL || `${req.protocol}://${req.get('host')}`;
    
        return res.json({
            success: true,
            shortCode,
            shortUrl: `${baseUrl}/${shortCode}`,
            originalUrl: urlData.originalUrl,
            clickCount: Number(clicks),
            createdAt: urlData.createdAt,
            expiresAt,
            isExpired: Date.now() > expiresAt.getTime(),
        });
    } catch (error) {
        console.log("error occuring due to: ",error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getClickDetails = async(req: Request,res: Response)=>{
    try {
        const { shortCode } = req.params;
        const { limit = 50 } = req.query;

        const logs = await redis.lrange<string>(`clicklog:${shortCode}`, 0, Number(limit) - 1);
        
        const clicks = logs.map(log => JSON.parse(log));

        return res.json({
            success: true,
            shortCode,
            clicks,
        });
    } catch (error) {
        console.log("error occuring due to: ",error);
        res.status(500).json({ error: "Server error" });
    }
}