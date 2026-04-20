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
    
        const urlData = await redis.hGetAll(`url:${shortCode}`);
        if (!urlData.originalUrl){
            return res.status(404).json({ error: "Not found" });
        }
    
        const clicks = (await redis.get(`clicks:${shortCode}`)) || "0";
    
        const expiresAt = new Date(urlData?.expiresAt!);
    
        return res.json({
            success: true,
            shortCode,
            originalUrl: urlData.originalUrl,
            totalClicks: Number(clicks),
            createdAt: urlData.createdAt,
            expiresAt,
            isExpired: Date.now() > expiresAt.getTime(),
        });
    } catch (error) {
        console.log("error occuring due to: ",error);
        res.status(500).json({ error: "Server error" });
    }
};