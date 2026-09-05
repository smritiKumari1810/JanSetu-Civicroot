import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import CitizenReport from './pages/CitizenReport';
import TrackingDashboard from './pages/TrackingDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import { FileText, ListOrdered, ShieldCheck } from 'lucide-react';
import './App.css';

const NavigationBar = () => {
  const location = useLocation();
  const isGov = location.pathname === '/gov-dashboard';

  if (isGov) return null; // Government dashboard has its own dedicated top bar

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-[#1A56DB] flex items-center">
          <span className="bg-[#1A56DB] text-white rounded-lg px-2 py-0.5 text-sm mr-2 font-mono">JS</span>
          JanSetu
        </Link>
        <div className="flex space-x-2 text-sm font-medium">
          <Link
            to="/report"
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition ${
              location.pathname === '/report'
                ? 'bg-orange-50 text-orange-600 font-semibold border border-orange-200'
                : 'text-gray-600 hover:text-[#1A56DB]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Report Issue</span>
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition ${
              location.pathname === '/dashboard'
                ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200'
                : 'text-gray-600 hover:text-[#1A56DB]'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>My Reports</span>
          </Link>
          <Link
            to="/gov-dashboard"
            className="px-3 py-1.5 rounded-md bg-slate-900 text-slate-100 hover:bg-slate-800 flex items-center space-x-1 text-xs transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>CivicRoot AI</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavigationBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/report" element={<CitizenReport />} />
            <Route path="/dashboard" element={<TrackingDashboard />} />
            <Route path="/gov-dashboard" element={<GovernmentDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
