export interface UrlResponse {
  success: boolean;
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  expiresAt: string;
  createdAt: string;
  clickCount?: number;
}

export interface StatsResponse {
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  expiresAt: string;
  createdAt: string;
}

export interface ClickData {
  timestamp: string;
  country: string;
  referer: string;
  userAgent: string;
}

export interface ClicksResponse {
  clicks: ClickData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ShortenUrlRequest {
  originalUrl: string;
  customAlias?: string;
  expiryDays?: number;
}
