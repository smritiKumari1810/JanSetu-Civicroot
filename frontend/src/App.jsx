import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CitizenReport from './pages/CitizenReport';
import TrackingDashboard from './pages/TrackingDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/report" element={<CitizenReport />} />
          <Route path="/dashboard" element={<TrackingDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
