# 🏛️ JanSetu + CivicRoot AI
> **From Citizen Complaints to Preventive Governance**
> *AI for Digital Public Infrastructure & Preventive Civic Intelligence*

**Team:** Mindshift (Birla Institute of Technology, Off campus Deoghar)  
**Members:** Smriti Kumari | Kajal Maan | Priyanka Kumari  
**HackQuest Submission**

---

## 🌟 Overview

Current municipal grievance systems treat citizen complaints as isolated tickets to resolve and close. This reactive approach blinds city officials to recurring patterns, systemic failures, and root causes.

**JanSetu + CivicRoot AI** transforms complaint management into a closed-loop civic intelligence platform:
1. **JanSetu (Citizen Layer):** An accessible, modern reporting and tracking portal supporting voice, photos, and geo-pinning.
2. **CivicRoot (Intelligence Layer):** An AI-driven engine powered by Google Gemini that analyzes disparate complaints across neighborhoods, clusters them into systemic hotspots, evaluates failure risk, and recommends proactive interventions.

```
Citizen Report (Voice/Photo/Text) ➔ Smart Ingestion ➔ Gemini AI Clustering ➔ Civic Risk Map ➔ Preventive Action
```

---

## 🚀 Key Features

### 📱 JanSetu (Citizen Experience)
- **Action-First Reporting:** Simplified, high-accessibility complaint reporting for potholes, water leaks, streetlights, and sanitation.
- **Evidence Support:** Live camera photo uploads & in-browser voice note recording streamed directly to **Cloudinary CDN**.
- **📍 GPS Pinning:** Instant 1-click automatic geolocation detection.
- **Live Status Tracking:** Transparent status chips (*Pending*, *In Progress*, *Resolved*) and complaint history.

### 🧠 CivicRoot AI (Government Command Center)
- **AI Pattern Clustering:** Automatically links dozens of separate complaints describing the same underlying problem.
- **Severity Risk Scoring:** Rates issue clusters as **High**, **Medium**, or **Low** risk to prioritize municipal response.
- **Root Cause & Preventive Matrix:** Generates actionable engineering hypotheses (e.g. distinguishing a local valve leak from a main pipeline rupture).
- **Interactive Civic Risk Density Map:** Visual Digital Twin representation of recurring neighborhood stress points.
- **🔄 Live Real-Time Refresh:** Instant synchronization with new citizen grievances as they are reported.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend UI** | React 19, Tailwind CSS, Lucide Icons, Vite | Ultra-fast, responsive single page application hosted on **Vercel**. |
| **Fault Tolerance** | React Error Boundary | Zero-crash guarantee catching unhandled UI exceptions. |
| **Backend API** | Node.js, Express 5, RESTful Services | Asynchronous, non-blocking API server hosted on **Render**. |
| **Database** | MongoDB Atlas (Cloud) | Geospatial indexing and scalable JSON document storage. |
| **Primary AI Tier** | Google Gemini 3.6 Flash (`@google/genai`) | Semantic reasoning, duplicate detection, and root-cause clustering. |
| **Secondary AI Tier** | Groq Cloud (Llama 3.3 70B) | High-speed 500 T/s fallback during token exhaustion or rate-limits. |
| **Tertiary AI Tier** | Built-in Heuristic Clustering | Guaranteed offline availability with zero external API dependencies. |
| **Media CDN** | Cloudinary | Instant image optimization and global audio streaming. |
| **Testing** | Jest, Supertest | 100% automated test suite with 9 passing test cases. |

---

## 🚦 Getting Started (Local Setup)

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev
```
Backend runs on **[http://localhost:5000](http://localhost:5000)** (Health check: `http://localhost:5000/health`).

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Running Automated Tests
```bash
cd backend
npm test
```

---

## 📖 Comprehensive Documentation
- 📘 **[Master Project Handbook (Start Here!)](docs/MASTER_PROJECT_HANDBOOK.md)** — Complete guide covering project idea, architecture, data flow, and non-coder explanations.
- 🏆 **[Hackathon Judge Q&A Cheat Sheet](docs/03_HACKATHON_JUDGE_QA.md)** — 16 high-scoring answers to judge questions.
- 🎤 **[3-Minute Presentation & Demo Script](docs/04_PRESENTATION_AND_DEMO_SCRIPT.md)** — Word-for-word pitch script.
- 📚 **[Technical Glossary for Non-Coders](docs/05_TECH_GLOSSARY_FOR_NON_CODERS.md)** — Plain-English dictionary of technical terms.
- 🚀 **[Vercel & Render Deployment Guide](docs/DEPLOY_VERCEL_RENDER.md)** — Step-by-step cloud deployment instructions.
