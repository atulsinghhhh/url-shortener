import { createClient } from "redis"

export const redis = createClient({
    url: process.env.REDIS_URL || "redis://redis:6379",
});

redis.on("error",(error)=>{
    console.error("Redis Error: ",error);
})

export async function connectRedis(){
    await redis.connect();
    console.log("Redis Connected to:", process.env.REDIS_URL || "redis://redis:6379");
}

/*
    time="2026-04-21T13:53:13+05:30" level=warning msg="C:\\Users\\Atul_Rathore\\chaiorlearn\\urlshortener\\docker-compose.yaml: 
    the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
*/