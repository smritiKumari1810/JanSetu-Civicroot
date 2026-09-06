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
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2 sm:space-x-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1A56DB] text-white rounded-xl flex items-center justify-center font-bold font-mono text-sm sm:text-base shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
            JS
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center">
              JanSetu <span className="text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-1 sm:px-1.5 py-0.5 rounded ml-1 sm:ml-1.5 border border-blue-200">AI</span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium hidden xs:block">Digital Public Infrastructure</p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link
            to="/report"
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-1.5 transition ${
              location.pathname === '/report'
                ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="inline">Report</span>
            <span className="hidden sm:inline">Issue</span>
          </Link>

          <Link
            to="/dashboard"
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-1.5 transition ${
              location.pathname === '/dashboard'
                ? 'bg-[#1A56DB] text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="inline">Track</span>
            <span className="hidden sm:inline">Reports</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1"></div>

          <Link
            to="/gov-dashboard"
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-1.5 shadow-md shadow-slate-900/20 transition border border-slate-700"
          >
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span className="inline">CivicRoot</span>
            <span className="hidden sm:inline">AI</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
        <NavigationBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/report" element={<CitizenReport />} />
            <Route path="/dashboard" element={<TrackingDashboard />} />
            <Route path="/gov-dashboard" element={<GovernmentDashboard />} />
            {/* Catch-all 404 Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        
        {/* Responsive Global Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium text-slate-700">JanSetu + CivicRoot AI Infrastructure</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Digital Public Infrastructure for Preventive Municipal Governance
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
