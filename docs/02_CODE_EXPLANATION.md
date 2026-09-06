# 💻 The Complete Code Guide (Explained for Non-Coders)

If you have never written a line of code in your life, **this document is for you**. It explains every single part of our application using simple, real-world analogies.

---

## 🏛️ The Restaurant Analogy (How Web Apps Work)

Think of our application like a modern restaurant:

1. **The Dining Room (Frontend / React):**  
   This is what the customer sees. It has nice tables, menus with pictures, and friendly order forms. In our app, this is the website where citizens type complaints and where officials view the dashboard.
2. **The Waiter (API Routes / Express):**  
   The customer doesn't walk into the kitchen. They give their order to the waiter. The waiter carries the order back to the kitchen and brings food back to the table. In our app, the **Express API** carries data between the screen and the database.
3. **The Pantry / Filing Cabinet (Database / MongoDB):**  
   Where all food, ingredients, and receipts are stored safely. In our app, **MongoDB Atlas** stores all past complaints, timestamps, and citizen IDs.
4. **The Master Chef (AI / Google Gemini):**  
   When 20 different tables order dishes with spoiled milk, the chef immediately notices the pattern and says: *"Stop! Check the milk delivery truck right now before anyone gets sick!"* In our app, **Gemini AI** reads all incoming complaints, finds the hidden patterns, and issues alerts.
5. **The Photo Album Vault (Cloudinary):**  
   A secure cloud locker where photos of broken potholes and audio recordings of voice notes are saved and served at high speed.

---

## 📁 File-by-File Breakdown

### 🗄️ 1. The Backend (`backend/`)

#### 📄 `backend/index.js` — The Front Reception
* **Plain English:** The main switchboard of our server.
* **What it does:**
  - Wakes up the server on port `5000`.
  - Connects to our **MongoDB Atlas** database in the cloud.
  - Plugs in all our doorways (`/api/complaints`, `/api/intelligence`, `/api/upload`).
  - Contains our **`GET /health`** route so monitoring services like Render can check if the server is healthy.

#### 📄 `backend/models/Complaint.js` — The Complaint Blueprint
* **Plain English:** An official complaint registration slip.
* **What it does:** Dictates what pieces of information MUST be recorded whenever a citizen files a grievance:
  - `title`: The headline (e.g. *"Pothole on 5th Avenue"*).
  - `category`: Category (Road, Water, Streetlight, Garbage, Electricity).
  - `description`: Detailed explanation.
  - `location`: GPS / Landmark location.
  - `status`: Current state (*Pending*, *In Progress*, *Resolved*).
  - `imageUrl`: Link to photo on Cloudinary.
  - `audioUrl`: Link to voice note on Cloudinary.
  - `createdAt`: Exact timestamp.

#### 📄 `backend/routes/complaints.js` — The Complaint Mailbox
* **Plain English:** Handles incoming and outgoing citizen complaints.
* **What it does:**
  - `POST /api/complaints`: Receives a new complaint from the citizen app, checks that no required fields are blank, and saves it into MongoDB.
  - `GET /api/complaints/:userId`: Looks up all complaints submitted by a specific citizen so they can track their status.
  - `DELETE /api/complaints/admin/clear-all`: A secure utility to wipe test data and start with a fresh, clean database.

#### 📄 `backend/routes/upload.js` — The Evidence Scanner
* **Plain English:** The intake desk for photos and audio notes.
* **What it does:**
  - Uses a tool called **Multer** to hold the uploaded photo or voice file in memory.
  - Sends it straight to **Cloudinary CDN**.
  - Returns a secure `https://res.cloudinary.com/...` link to attach to the grievance report.

#### 📄 `backend/services/aiService.js` — The Triple-Tier AI Detective
* **Plain English:** The intelligence brain that connects the dots across complaints with 3 safety nets.
* **How it works:**
  1. **Tier 1 (Primary):** Sends complaints to **Google Gemini 3.6 Flash** for semantic deduplication and deep root-cause reasoning.
  2. **Tier 2 (Secondary Fallback):** If Gemini tokens are exhausted or rate-limited, it instantly hot-swaps to **Groq Cloud (Llama 3.3 70B)** at 500 tokens/second.
  3. **Tier 3 (Tertiary Fallback):** If all external AI APIs are offline, our built-in mathematical clustering engine calculates hotspots locally so the system **never crashes or experiences downtime**.

#### 📄 `backend/routes/intelligence.js` — The City Official API
* **Plain English:** Delivers the AI insights to the government dashboard.
* **What it does:**
  - `GET /api/intelligence/hotspots`: Calls the AI service and sends the clustered hotspots to the screen.
  - `GET /api/intelligence/stats`: Calculates citywide stats (Total complaints, % resolved, active hotspots).

#### 📄 `backend/tests/api.test.js` — The Automated Inspector
* **Plain English:** A robot that tests every single button and feature automatically in under 5 seconds.
* **What it does:**
  - Tests 9 different scenarios (Server health, valid complaint submission, missing field rejection, user filtering, AI clustering, photo upload, voice note upload, and resolution stats).
  - Guarantees that our code works with **100% reliability**.

---

### 🎨 2. The Frontend (`frontend/`)

#### 📄 `frontend/src/components/ErrorBoundary.jsx` — The Zero-Crash Circuit Breaker
* **Plain English:** An emergency safety net around the entire user interface.
* **What it does:** If an unexpected visual error happens in the browser, instead of showing a blank white screen, it catches the error and displays a sleek, friendly recovery screen with a "Reload Page" button.

#### 📄 `frontend/src/config/api.js` — The Smart Address Book
* **Plain English:** Automatically connects the frontend to the backend whether running on your laptop (`localhost:5000`) or in production on **Render** (`https://jansetu-backend.onrender.com`).

#### 📄 `frontend/src/App.jsx` — The Traffic Director
* **Plain English:** Controls navigation across the app with responsive mobile-friendly tabs, a 404 route safety catcher, and a live DPI status footer.
* **Routes:**
  - `/report` ➔ Opens the Citizen Reporting Page.
  - `/dashboard` ➔ Opens the Citizen Status Tracking Page.
  - `/gov-dashboard` ➔ Opens the CivicRoot AI Command Center.

#### 📄 `frontend/src/pages/CitizenReport.jsx` — The Citizen Intake Form
* **Plain English:** The screen where a citizen files a complaint.
* **Features:**
  - Category selector with clean icons.
  - **"📍 Auto-detect GPS"** button to automatically pinpoint location.
  - **Photo Upload:** Select or snap a photo with live thumbnail preview and 15MB file size safety checks.
  - **Voice Note Recorder:** Records audio live in the browser with play/pause and re-record controls.
  - Sends everything to Cloudinary and MongoDB with one click.

#### 📄 `frontend/src/pages/TrackingDashboard.jsx` — The Grievance Tracker
* **Plain English:** The "My Reports" page where citizens check the progress of their complaints.
* **Features:**
  - Live search bar and filter tabs (*All*, *Pending*, *In Progress*, *Resolved*).
  - Status chips that change color automatically.
  - **"📷 View Attached Photo"** buttons and **🎙️ Audio Players** to listen to recorded voice notes.
  - Safe null-handling and robust date formatter that never shows `Invalid Date`.

#### 📄 `frontend/src/pages/GovernmentDashboard.jsx` — The CivicRoot AI Command Center
* **Plain English:** The high-tech control room for city administrators.
* **Features:**
  - **4 Top KPI Cards:** Total Grievances, AI Hotspots, High Risk Alerts, and Resolution Rate.
  - **Live Civic Risk Map:** A visual digital twin map with pulsing danger indicators showing where issues are clustering.
  - **AI Root Cause & Preventive Action Matrix:** A clear table showing what the AI detected, why it happened, and what action engineers should take (with horizontal mobile scrolling support).
  - **🔄 Live Refresh Button:** Instant one-click button to reload incoming complaints and re-run AI intelligence in real time.
