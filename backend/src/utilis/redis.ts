import { createClient } from "redis"

export const redis = createClient({
    url: "redis://localhost:6379",
});

redis.on("error",(error)=>{
    console.error("Redis Error: ",error);
})

export async function connectRedis(){
    await redis.connect();
    console.log("Redis Connected");
}