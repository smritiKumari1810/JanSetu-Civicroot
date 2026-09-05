# 🚀 Step-by-Step Deployment Guide: Render (Backend) & Vercel (Frontend)

Follow this 2-part guide to deploy **JanSetu + CivicRoot AI** live on the web for free.

---

## 📌 Deployment Overview
1. **Part 1:** Deploy the **Backend** on **Render.com** (to get your live API URL).
2. **Part 2:** Deploy the **Frontend** on **Vercel.com** (and link it to the Render API).

```
[🖥️ React Frontend on Vercel] ──(Calls API)──► [⚙️ Express Backend on Render] ──► [🗄️ MongoDB Atlas]
```

---

## 🟢 Part 1: Deploy Backend to Render

### Step 1.1: Push Project to GitHub
Make sure your latest code is pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure project for Vercel and Render deployment"
git push -u origin master
```

### Step 1.2: Create Web Service on Render
1. Go to **[dashboard.render.com](https://dashboard.render.com/)** and sign in (using your GitHub account).
2. Click **"New +"** ➔ Select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and connect your `JanSetu-CivicRoot` repository.

### Step 1.3: Configure Settings
Fill in the following fields:
- **Name:** `jansetu-backend` (or any name you prefer)
- **Region:** `Singapore` or `Oregon` (closest to your users)
- **Branch:** `master` (or `main`)
- **Root Directory:** `backend` *(⚠️ Important)*
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

### Step 1.4: Add Environment Variables
Scroll down to **"Environment Variables"** and add:
- `MONGO_URI` = `mongodb://Jansetu-CivicRoot:2Zp3kqbX4NIaBgU8@ac-ym4qevq-shard-00-00.9cenpcq.mongodb.net:27017,ac-ym4qevq-shard-00-01.9cenpcq.mongodb.net:27017,ac-ym4qevq-shard-00-02.9cenpcq.mongodb.net:27017/Jansetucivicroot?ssl=true&replicaSet=atlas-maliaz-shard-0&authSource=admin&appName=Cluster0`
- `GEMINI_API_KEY` = `your_gemini_api_key_here` *(Optional)*
- `NODE_ENV` = `production`

### Step 1.5: Deploy & Copy Live URL
1. Click **"Deploy Web Service"**.
2. Once deployed (in 1-2 minutes), Render will give you a live URL at the top (e.g., `https://jansetu-backend.onrender.com`).
3. **Copy this URL!** You will need it in Part 2.

---

## 🔺 Part 2: Deploy Frontend to Vercel

### Step 2.1: Import Project to Vercel
1. Go to **[vercel.com](https://vercel.com/)** and sign in with GitHub.
2. Click **"Add New..."** ➔ **"Project"**.
3. Select your `JanSetu-CivicRoot` repository and click **"Import"**.

### Step 2.2: Configure Project Settings
1. **Framework Preset:** Select `Vite`.
2. **Root Directory:** Click **Edit** and select `frontend`.
3. **Build Command:** `npm run build` (Default)
4. **Output Directory:** `dist` (Default)

### Step 2.3: Add Backend URL Environment Variable
Under **"Environment Variables"**, add:
- **Key:** `VITE_API_BASE_URL`
- **Value:** `https://your-backend-name.onrender.com` *(Paste your Render URL from Part 1 here, without a trailing slash)*

### Step 2.4: Deploy
1. Click **"Deploy"**.
2. Vercel will build and launch your site in ~30 seconds!
3. You will get a live link like `https://jansetu-civicroot.vercel.app`.

---

## ✅ Post-Deployment Verification
1. Open your live Vercel link.
2. Go to `/report` and submit a test grievance.
3. Check `/dashboard` to confirm your live complaint appears.
4. Check `/gov-dashboard` to view the CivicRoot AI Command Center!
