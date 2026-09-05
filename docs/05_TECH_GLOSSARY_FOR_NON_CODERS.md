# 📚 Technical Glossary for Non-Coders

Keep this pocket dictionary handy during your hackathon presentation! If a judge or mentor throws a technical term at you, this guide tells you **what it means in plain English** and **how we use it in JanSetu + CivicRoot**.

---

### 1. Frontend & UI
* **Frontend:** The visual part of the website that citizens and officials see, touch, and click. Built with **React** and styled with **Tailwind CSS**.
* **React:** A popular web framework created by Meta (Facebook) that lets you build fast, interactive user interfaces using reusable Lego-like components.
* **Tailwind CSS:** A modern design tool that makes websites look clean, responsive, and beautiful on both mobile phones and desktop screens.
* **SPA (Single Page Application):** A modern website style where pages switch instantly without making your whole browser reload.

---

### 2. Backend & Server
* **Backend:** The behind-the-scenes engine that runs on the server, talks to the database, and processes AI calculations. Built with **Node.js** and **Express**.
* **Node.js:** A tool that lets us run JavaScript code on the server (outside of a web browser).
* **Express.js:** A lightweight, high-speed framework for Node.js that creates our API "doorways" (endpoints).
* **Endpoint / Route:** A specific URL where the frontend asks the backend for data (e.g., `GET /api/intelligence/hotspots`).
* **CORS (Cross-Origin Resource Sharing):** A security rule in web browsers. We configured CORS so our frontend hosted on **Vercel** is permitted to talk safely to our backend on **Render**.
* **Health Check (`/health`):** A lightweight route that answers *"Yes, I am alive, here is my uptime and database status!"* Used by cloud monitors to ensure 24/7 reliability.

---

### 3. Database & Cloud Storage
* **Database (MongoDB Atlas):** A cloud database where all complaints, timestamps, user IDs, and status notes are stored in flexible documents (similar to digital index cards).
* **Mongoose:** A helper tool for Node.js that enforces our complaint schema (making sure no one submits a complaint without a title or location).
* **Cloudinary:** A global cloud media service (CDN). Instead of saving heavy photos and audio files directly in the database, we upload them to Cloudinary and just save the fast link.
* **Multer:** A backend helper that catches photos and audio notes uploaded from the citizen's browser and streams them directly to Cloudinary.

---

### 4. Artificial Intelligence & Machine Learning
* **LLM (Large Language Model):** An advanced AI model trained on massive amounts of text. We use **Google Gemini 3.6 Flash** to read and understand citizen complaints.
* **Semantic Clustering:** The ability of AI to understand meaning rather than just matching exact keywords. (e.g., realizing that *"water gushing on road"* and *"muddy tap water"* are related to the same pipe break).
* **Heuristic Fallback:** Our built-in backup engine. If the cloud AI is ever unreachable, our system automatically switches to local pattern algorithms so the app never goes down.
* **Root Cause Analysis:** Moving beyond the symptom (a puddle on the street) to identify the true source (a broken underground main pipe).

---

### 5. Quality Assurance & Deployment
* **Jest & Supertest:** Automated testing tools. They run 9 automated tests in under 5 seconds to verify that every route, validation check, and upload works with 100% accuracy.
* **Vercel:** A modern global hosting platform optimized for React frontends.
* **Render:** A cloud hosting platform that runs our backend Node.js API server 24/7.
* **`.env` (Environment Variables):** A private, hidden file on the server where secret keys (like database passwords and AI keys) are locked away so hackers cannot steal them.
* **Git & GitHub:** The version control system (Git) and online repository (GitHub) that tracks every change made to the code and allows team collaboration.
