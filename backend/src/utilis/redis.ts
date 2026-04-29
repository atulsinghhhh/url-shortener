import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function connectRedis() {
  try {
    // Upstash HTTP client doesn't need a persistent connection, 
    // but we can verify it by doing a simple ping.
    const pong = await redis.ping();
    if (pong === "PONG") {
      console.log("🚀 Upstash Redis connected successfully");
    }
  } catch (error) {
    console.error("❌ Upstash Redis connection error:", error);
  }
}