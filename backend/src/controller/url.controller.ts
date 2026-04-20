import { redis } from "../utilis/redis"
import { generateShortCode } from "../utilis/shortCode"
import type { Request, Response } from "express";

const BASE_URL = process.env.URL;

export const createShortUrl = async(req: Request,res:Response) => {
    try {
        const { originalUrl,customAlias,expiryDays=30} = req.body();
        if (!originalUrl){
            return res.status(400).json({ error: "originalUrl required" });
        }

        if (
            !originalUrl.startsWith("http://") &&
            !originalUrl.startsWith("https://")
        ){
            return res.status(400).json({ error: "Invalid URL format" });
        }

        let shortCode=customAlias || generateShortCode();

        const exists=await redis.exists(`url:${shortCode}`);
        if(exists){
            return res.status(400).json({ error: "Alias already exists" });
        }

        const createdAt = new Date();
        const expiresAt = new Date(
            Date.now() + expiryDays * 24 * 60 * 60 * 1000
        );

        await redis.hSet(`url:${shortCode}`,{
            originalUrl,
            createdAt: createdAt.toISOString(),
            expiresAt: expiresAt.toISOString(),
        })

        await redis.expire(
            `url:${shortCode}`,
            expiryDays * 24 * 60 * 60
        );

        return res.status(201).json({
            success: true,
            shortCode,
            shortUrl: `${BASE_URL}/${shortCode}`,
            originalUrl,
            expiresAt,
            createdAt,
        });

    } catch (error) {
        console.log("error occuring due to: ",error);
        res.status(500).json({ error: "Server error" });
    }
}

export const redirectUrl = async(req: Request,res: Response)=>{
    try {
        const { shortCode }= req.params;
        const data=await redis.hGetAll(`url:${shortCode}`);

        if(!data.originalUrl){
            return res.status(404).json({ error: "URL not found" });
        }
        await redis.incr(`clicks:${shortCode}`);
        await redis.lPush(
            `clicklog:${shortCode}`,
            JSON.stringify({
                timestamp: new Date(),
                userAgent: req.headers["user-agent"],
                referer: req.headers.referer,
            })
        )

        return res.redirect(data.originalUrl);
    } catch (error) {
        console.log("error occuring due to: ",error);
        res.status(500).json({ error: "Server error" });
    }
}

export const deleteShortUrl=  async(req: Request,res: Response)=>{
    try {
        const { shortCode } = req.params;

        await redis.del(`url:${shortCode}`);
        await redis.del(`clicks:${shortCode}`);
        await redis.del(`clicklog:${shortCode}`);

        return res.json({
            success: true,
            message: "Short URL deleted successfully",
            shortCode,
        });
    } catch (error) {
        console.log("error occuring due to: ",error);
        res.status(500).json({ error: "Server error" });
    }
}