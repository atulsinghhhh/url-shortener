# 🔗 Sniply - Premium URL Shortener

![Sniply Banner](https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200&h=400)

**Sniply** is a high-performance, full-stack URL shortening service designed with speed and aesthetics in mind. Built with a modern tech stack featuring React, Express, and Upstash Redis, it provides real-time analytics and a seamless user experience.

---

## ✨ Key Features

- 🚀 **Lightning Fast**: Powered by Upstash Redis for sub-millisecond lookups.
- 📊 **Real-time Analytics**: Track clicks, geographic data, browser statistics, and OS distributions.
- 🖼️ **QR Code Generation**: Instantly generate QR codes for any shortened link.
- 🎨 **Premium UI**: Crafted with React 19, Tailwind CSS 4, and Framer Motion for a fluid, modern feel.
- 🐳 **Docker Ready**: Fully containerized for easy deployment and scaling.
- 🛠️ **Developer Friendly**: Clean TypeScript codebase with integrated CI/CD workflows.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 (with CSS variables and modern themes)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Toast**: React Hot Toast
- **Navigation**: React Router DOM

### Backend
- **Runtime**: Bun / Node.js
- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: Upstash Redis (Serverless HTTP SDK)

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Linting**: ESLint & TypeScript-ESLint

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose
- [Bun](https://bun.sh/) (Optional, for local development)
- [Node.js](https://nodejs.org/) (Optional, for local development)

### Quick Start with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atulsinghhhh/url-shortener.git
   cd url-shortener
   ```

2. **Spin up the services:**
   ```bash
   docker-compose up -d --build
   ```

3. **Live Demo:**
   - **Frontend (Official)**: [https://frontend-six-peach-98.vercel.app/](https://frontend-six-peach-98.vercel.app/)
   - **Backend API (Render)**: [https://url-shortener-backend-2i00.onrender.com/](https://url-shortener-backend-2i00.onrender.com/)

---

## 🚢 Deployment

### Automated Deployment (CI/CD)
This project is pre-configured with GitHub Actions for automated building and pushing of Docker images.
1. Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` to your GitHub repository secrets.
2. Every push to the `main` branch will trigger the **CD Pipeline**, which builds and pushes the latest images to Docker Hub.

### Manual Deployment (VPS)
To deploy on a server (e.g., AWS, DigitalOcean, Linode):

1. **Prepare the server**: Install Docker and Docker Compose.
2. **Copy the configuration**: Transfer the `docker-compose.yaml` file to your server.
3. **Pull and Run**:
   ```bash
   # Pull the images (if using Docker Hub) or build them locally
   docker-compose pull
   docker-compose up -d
   ```
4. **Reverse Proxy (Optional)**: Use Nginx or Traefik to handle SSL/HTTPS and point your domain to the frontend (port 5173) and backend (port 3000).

---

## 📡 API Reference

### URL Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/urls` | Shorten a long URL |
| `GET` | `/:shortCode` | Redirect to the original URL |
| `DELETE` | `/api/v1/urls/:shortCode` | Delete a shortened link |

### Analytics & Health
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/stats/:shortCode` | Get summary statistics for a link |
| `GET` | `/api/v1/stats/:shortCode/clicks` | Get detailed click logs |
| `GET` | `/api/v1/health` | Service health check |

---

## 📂 Project Structure

```text
.
├── .github/workflows/    # CI/CD pipelines (CI & CD)
├── backend/              # Express API (Bun + TypeScript)
│   ├── src/
│   │   ├── controller/   # Request handlers
│   │   ├── routes/       # API endpoints
│   │   └── utilis/       # Redis & helper functions
│   └── Dockerfile
├── frontend/             # React App (Vite + Tailwind)
│   ├── src/
│   │   ├── components/   # UI Components
│   │   ├── pages/        # Main application views
│   │   └── services/     # API integration logic
│   └── Dockerfile
└── docker-compose.yaml   # Service orchestration
```

---

## 🛡️ License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/atulsinghhhh">Atul Rathore</a>
</p>
