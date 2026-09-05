# JanSetu + CivicRoot AI: Deployment & Operations Guide

This guide provides step-by-step instructions for running **JanSetu + CivicRoot AI** both locally and in production cloud environments.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18 or higher ([Download Node.js](https://nodejs.org/))
- **MongoDB**: (Optional) Local MongoDB or MongoDB Atlas free cluster

### 2. Installation
Open your terminal in the project root directory and run:
```bash
# 1. Install root, backend, and frontend dependencies
npm run install:all
```

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory (you can copy from `backend/.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jansetu
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no `GEMINI_API_KEY` is provided, the platform automatically activates the built-in intelligent clustering engine so the entire app remains 100% operational).*

### 4. Launch Development Servers
```bash
# Starts both frontend (port 5173) and backend (port 5000) simultaneously
npm run dev
```
- 📱 **Citizen Portal & Tracker**: [http://localhost:5173](http://localhost:5173)
- 🏛️ **CivicRoot AI Command Center**: [http://localhost:5173/gov-dashboard](http://localhost:5173/gov-dashboard)

---

## 🐳 Containerized Production Launch (Docker Compose)

Deploy the full stack (Database + Backend + Frontend) in isolated containers with one command:

```bash
docker compose up --build -d
```
- **Access App**: [http://localhost](http://localhost)
- **Stop Containers**: `docker compose down`

---

## 🧪 Automated Testing

Run the automated test suite covering all APIs, validation handlers, and AI clustering algorithms:
```bash
npm test
```

---

## ☁️ Cloud Deployment Options

### Option A: Google Cloud Run (Recommended for HackQuest)
1. Build and push the Docker image to Google Container Registry (GCR):
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/jansetu-backend ./backend
   ```
2. Deploy to Cloud Run:
   ```bash
   gcloud run deploy jansetu-backend --image gcr.io/YOUR_PROJECT_ID/jansetu-backend --platform managed --set-env-vars MONGO_URI="...",GEMINI_API_KEY="..."
   ```

### Option B: Render / Railway / Vercel
- **Frontend**: Deploy `frontend/` to **Vercel** or **Netlify** with build command `npm run build` and output directory `dist`.
- **Backend**: Deploy `backend/` to **Render** or **Railway** as a Node service with start command `node index.js`.
