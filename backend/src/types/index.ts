export interface RedisUrlData {
    originalUrl: string;
    createdAt: string;
    expiresAt: string;
    [key: string]: string | undefined;
}

export interface ClickLog {
    timestamp: string;
    userAgent: string;
    referer: string;
}
