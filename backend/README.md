

#url management

post: /api/v1/urls

body: {
    originalUrld: string (required) the long url to shorten
    customerAlias string (optional) a custom short code e.g: "my-alias
    expiryDays: number (optional) how many days before it expires (default: 30)
}

<!-- validations -->

originalUrl must be a vaild url format
originalurl must start with http:// or https://
customAlias must be alphanumeric 3-20 chars,no spaces
customAlias must not already exist in Redis

success Response 201:
{
    success: true,
    shortCode: "abc123",
    shortUrl: "http://localhost:3000/abc123,
    originalUrl: "https://www.google.com",
    expiresAt: "2026-05-20T10:00:00Z",
    createdAt:    "2026-04-20T10:00:00Z"
}

GET: /api/v1/ShortCode
purpose Redirect user to the original URL

Success
Redirect to: https://www.google.com

DELETE: api/v1/urls/:shortCode
purpose Delete a short url manaually


{
  success:    true,
  message:    "Short URL deleted successfully",
  shortCode:  "abc123"
}


<!-- stats & analytics -->

GET: /api/v1/stats/:ShortCode

{
  success:      true,
  shortCode:    "abc123",
  originalUrl:  "https://www.google.com",
  shortUrl:     "http://localhost:3000/abc123",
  totalClicks:  42,
  createdAt:    "2026-04-20T10:00:00Z",
  expiresAt:    "2026-05-20T10:00:00Z",
  daysLeft:     29,
  isExpired:    false
}

GET: /api/v1/stats/:shortCode/clicks

limit   → number of clicks to return (default: 20, max: 100)
page    → pagination page number (default: 1)

{
  success:      true,
  shortCode:    "abc123",
  totalClicks:  42,
  page:         1,
  limit:        20,
  clicks: [
    {
      timestamp:  "2026-04-20T10:05:00Z",
      country:    "IN",
      referer:    "https://twitter.com",
      userAgent:  "Mozilla/5.0..."
    },
    ...
  ]
}

GET: /api/v1/health

{
  status:   "ok",
  server:   "running",
  redis:    "connected",
  uptime:   3600
}

GET: /api/v1/validate

url  →  the URL to validate

<!-- midddleware stack -->

Request
   ↓
1. CORS Middleware          — Allow React frontend to call API
   ↓
2. JSON Body Parser         — Parse incoming JSON body
   ↓
3. Request Logger           — Log method, route, timestamp
   ↓
4. Rate Limiter             — Block IPs exceeding 10 req/min
   ↓
5. URL Validator            — Validate URL format on POST
   ↓
6. Route Handler            — Execute controller logic
   ↓
7. Error Handler            — Catch and format all errors
   ↓
Response