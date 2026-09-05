import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import CitizenReport from './pages/CitizenReport';
import TrackingDashboard from './pages/TrackingDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import { FileEdit, ListFilter, ShieldAlert, Sparkles, Building2 } from 'lucide-react';
import './App.css';

const NavigationBar = () => {
  const location = useLocation();
  const isGov = location.pathname === '/gov-dashboard';

  if (isGov) return null; // Government command center has its own specialized top bar

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 bg-govBlue text-white rounded-xl flex items-center justify-center font-bold font-mono shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
            JS
          </div>
          <div>
            <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center">
              JanSetu <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1.5 border border-blue-200">AI</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Digital Public Infrastructure</p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            to="/report"
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition ${
              location.pathname === '/report'
                ? 'bg-actionOrange text-white shadow-md shadow-orange-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>Report Issue</span>
          </Link>

          <Link
            to="/dashboard"
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition ${
              location.pathname === '/dashboard'
                ? 'bg-govBlue text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>My Reports</span>
          </Link>

          <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <Link
            to="/gov-dashboard"
            className="px-3 sm:px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-xs sm:text-sm flex items-center space-x-1.5 shadow-md shadow-slate-900/20 transition border border-slate-700"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>CivicRoot AI</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <NavigationBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/report" element={<CitizenReport />} />
            <Route path="/dashboard" element={<TrackingDashboard />} />
            <Route path="/gov-dashboard" element={<GovernmentDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
