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
- **Evidence Support:** Photo upload & voice note recording simulation.
- **Live Status Tracking:** Transparent status chips (*Pending*, *In Progress*, *Resolved*) and complaint history.

### 🧠 CivicRoot AI (Government Command Center)
- **AI Pattern Clustering:** Automatically links dozens of separate complaints describing the same underlying problem.
- **Severity Risk Scoring:** Rates issue clusters as **High**, **Medium**, or **Low** risk to prioritize municipal response.
- **Root Cause & Preventive Matrix:** Generates actionable engineering hypotheses (e.g. distinguishing a local valve leak from a main pipeline rupture).
- **Interactive Civic Risk Density Map:** Visual Digital Twin representation of recurring neighborhood stress points.
- **⚡ One-Click Demo Seeder:** Injects realistic test scenarios directly into the AI analyzer for instant live demonstrations.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Frontend UI** | React 19, Tailwind CSS, Lucide Icons, Vite |
| **Backend API** | Node.js, Express 5, RESTful Services |
| **Database** | MongoDB / Mongoose |
| **AI & Analytics** | Google Gemini API (`@google/genai`), Intelligent Heuristic Clustering Engine |
| **Testing** | Jest, Supertest |
| **DevOps** | Docker, Docker Compose, Nginx |

---

## 🚦 Getting Started

### 1. Local Development
```bash
# Install dependencies
npm run install:all

# Run backend and frontend together
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Docker Production Deployment
```bash
docker compose up --build
```
Open **[http://localhost](http://localhost)** in your browser.

### 3. Running Automated Tests
```bash
npm test
```

---

## 📖 Comprehensive Documentation
- 📘 **[Master Project Handbook (Start Here!)](docs/MASTER_PROJECT_HANDBOOK.md)** — Everything from project idea to development, modules, data flows, and non-coder guides.
- 🏆 **[Hackathon Judge Q&A Cheat Sheet](docs/03_HACKATHON_JUDGE_QA.md)** — 15 high-scoring questions and answers.
- 🎤 **[3-Minute Presentation & Demo Script](docs/04_PRESENTATION_AND_DEMO_SCRIPT.md)** — Step-by-step pitch script.
- 📚 **[Technical Glossary for Non-Coders](docs/05_TECH_GLOSSARY_FOR_NON_CODERS.md)** — Plain-English dictionary of technical terms.
- 🚀 **[Vercel & Render Deployment Guide](docs/DEPLOY_VERCEL_RENDER.md)** — Step-by-step cloud deployment instructions.
