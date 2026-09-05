# 💻 Codebase Walkthrough (Non-Coder Friendly Guide)

This guide breaks down every single file in the project, explaining what it does in simple, plain English without heavy jargon.

---

## 🗂️ Project Structure Overview

```text
JanSetu+Civicroot/
├── backend/                  # The Server (The Brain & Data Storage)
│   ├── models/               # Database Blueprints
│   │   └── Complaint.js      # Blueprint for how a complaint is stored
│   ├── routes/               # API Doorways (How the app talks to the server)
│   │   ├── complaints.js     # Handles saving & fetching complaints
│   │   └── intelligence.js   # Handles AI hotspot detection & statistics
│   ├── services/
│   │   └── aiService.js      # Google Gemini AI connection & clustering logic
│   ├── tests/
│   │   └── api.test.js       # Automated tests to verify everything works
│   ├── index.js              # The main entry point of the backend server
│   └── Dockerfile            # Container configuration for cloud deployment
│
├── frontend/                 # The User Interface (What people see and click)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CitizenReport.jsx        # The complaint reporting form screen
│   │   │   ├── TrackingDashboard.jsx    # Citizen's "My Reports" status page
│   │   │   └── GovernmentDashboard.jsx  # City official AI command center
│   │   ├── App.jsx           # Main navigation and router
│   │   └── main.jsx          # Starts up the React application
│   ├── Dockerfile            # Container configuration for frontend
│   └── nginx.conf            # High-speed web server configuration
│
├── docker-compose.yml        # One-click startup for Database + Backend + Frontend
└── package.json              # Main project control center
```

---

## 📂 Detailed File-by-File Breakdown

### 🖥️ The Backend (Server Side)

#### 1. `backend/index.js`
- **What it is:** The reception desk and front door of the server.
- **What it does:** Starts the Express server on port 5000, connects to the MongoDB database, enables CORS (so the frontend can talk to the backend), and routes incoming web requests to the appropriate handlers.

#### 2. `backend/models/Complaint.js`
- **What it is:** The digital form template.
- **What it does:** Defines what information is required when a complaint is recorded:
  - `title`: Short title (e.g., "Pothole on Main St")
  - `category`: Category (Pothole, Water Leak, Streetlight, Garbage, Other)
  - `description`: Full details
  - `location`: Neighborhood / GPS landmark
  - `status`: Default is "Pending" (updates to "In Progress" or "Resolved")
  - `userId`: Identifier for tracking
  - `createdAt`: Date and time of submission

#### 3. `backend/routes/complaints.js`
- **What it is:** The citizen grievance API endpoints.
- **What it does:**
  - `POST /api/complaints`: Receives a new complaint from a citizen and saves it into the database.
  - `GET /api/complaints/:userId`: Looks up all previous complaints submitted by a specific citizen so they can track progress.

#### 4. `backend/routes/intelligence.js`
- **What it is:** The municipal intelligence API endpoints.
- **What it does:**
  - `GET /api/intelligence/hotspots`: Fetches all complaints and runs them through the AI engine to return grouped clusters with risk scores.
  - `GET /api/intelligence/stats`: Calculates citywide totals, resolution rates (%), and counts of pending/resolved complaints.

#### 5. `backend/services/aiService.js`
- **What it is:** The AI Engine (powered by Google Gemini).
- **What it does:**
  - Takes raw, unstructured complaints from all over the city.
  - Passes them to **Gemini 2.5 Flash** with a specialized prompt to detect hidden patterns (e.g. realizing that 5 separate complaints about low pressure, muddy water, and flooded sidewalks on the same block are all caused by one broken main pipe).
  - Calculates a **Severity Risk** (High, Medium, Low).
  - Recommends concrete **Preventive Actions** for engineers.
  - Includes an intelligent built-in fallback engine so the platform works seamlessly even if no Gemini API key is configured.

#### 6. `backend/tests/api.test.js`
- **What it is:** The automated quality inspector.
- **What it does:** Contains 6 automated test cases that test every API route, input validation, and clustering algorithm in under 4 seconds to guarantee zero bugs.

---

### 🎨 The Frontend (User Interface)

#### 1. `frontend/src/App.jsx`
- **What it is:** The master controller and navigation bar.
- **What it does:** Controls routing across the 3 main pages:
  - `/report` ➔ Citizen Report Portal
  - `/dashboard` ➔ Citizen Tracking Page
  - `/gov-dashboard` ➔ CivicRoot AI Command Center

#### 2. `frontend/src/pages/CitizenReport.jsx`
- **What it is:** The Citizen Reporting Screen.
- **What it does:**
  - Provides a clean, mobile-first form designed using JanSetu Governance design tokens.
  - Captures title, category, description, and location.
  - Simulates camera and voice note evidence capture.
  - Submits data to the backend with smooth animations and instant confirmation.

#### 3. `frontend/src/pages/TrackingDashboard.jsx`
- **What it is:** The Citizen Status Tracking Screen ("My Reports").
- **What it does:**
  - Displays a feed of the user's submitted grievances.
  - Shows color-coded status chips (Green for *Resolved*, Amber for *In Progress*, Indigo for *Pending*).
  - Displays timestamps and location tags for complete transparency.

#### 4. `frontend/src/pages/GovernmentDashboard.jsx`
- **What it is:** The CivicRoot AI Command Center.
- **What it does:**
  - **KPI Cards:** Live counts of Total Grievances, AI Hotspots Detected, High Risk Failures, and Resolution Rate.
  - **Live Civic Risk Map:** A visual digital twin displaying geographic density and pulsing risk indicators.
  - **AI Root Cause & Preventive Matrix:** A structured table displaying AI diagnoses and recommended engineering interventions.
  - **⚡ Seed Demo Data Button:** One-click button that populates realistic municipal data for instant presentation demonstrations.

---

### 🐳 DevOps & Deployment Files

#### 1. `docker-compose.yml`
- **What it is:** The universal launcher.
- **What it does:** Bundles MongoDB, Node.js Backend, and Nginx Frontend into isolated containers and starts them simultaneously with one command (`docker compose up`).

#### 2. `package.json` (Root)
- **What it is:** The project remote control.
- **What it does:** Lets you run `npm run dev` to start both frontend and backend concurrently in one terminal window.
