import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  RefreshCw, 
  ShieldAlert, 
  Layers, 
  BarChart3,
  Flame
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const GovernmentDashboard = () => {
  const [hotspots, setHotspots] = useState([]);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolvedComplaints: 0,
    inProgressComplaints: 0,
    pendingComplaints: 0,
    resolutionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hotspotsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/intelligence/hotspots`).catch(() => null),
        fetch(`${API_BASE_URL}/api/intelligence/stats`).catch(() => null)
      ]);

      if (hotspotsRes && hotspotsRes.ok) {
        const data = await hotspotsRes.json();
        setHotspots(data.hotspots || []);
      }
      if (statsRes && statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData);
      }
    } catch (err) {
      console.error('Failed to load civic intelligence:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Demo seeder so hackathon judges & testers can immediately see AI clustering in action
  const handleSeedDemoData = async () => {
    setSeeding(true);
    const demoComplaints = [
      { title: 'Major water leakage near Central Park', category: 'Water Leak', description: 'Water gushing onto road since morning, pressure dropping in nearby apartments.', location: 'Sector 4, Central Park', userId: 'cit-1' },
      { title: 'Low water pressure and brown tap water', category: 'Water Leak', description: 'Tap water is muddy and pressure is very weak for past 2 days.', location: 'Sector 4, Central Park', userId: 'cit-2' },
      { title: 'Burst pipe causing road flooding', category: 'Water Leak', description: 'Main supply pipe broken near park gate 2. Urgent attention needed.', location: 'Sector 4, Central Park', userId: 'cit-3' },
      { title: 'Dangerous deep pothole on MG Road junction', category: 'Pothole', description: 'Deep crater after rain causing severe bike accidents.', location: 'MG Road Junction', userId: 'cit-4' },
      { title: 'Asphalt eroded near MG Road flyover', category: 'Pothole', description: 'Multiple potholes expanding across both lanes.', location: 'MG Road Junction', userId: 'cit-5' },
      { title: 'Streetlights flickering and going out', category: 'Streetlight', description: 'Entire 200m stretch dark at night, safety concern.', location: 'Civil Lines Road', userId: 'cit-6' }
    ];

    try {
      for (const item of demoComplaints) {
        await fetch(`${API_BASE_URL}/api/complaints`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      }
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const filteredHotspots = selectedCategory === 'All' 
    ? hotspots 
    : hotspots.filter(h => h.category?.toLowerCase() === selectedCategory.toLowerCase());

  const getRiskBadge = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200"><Flame className="w-3 h-3 mr-1" /> High Risk</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200"><Clock className="w-3 h-3 mr-1" /> Medium Risk</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" /> Low Risk</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-[#1E293B]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-200 bg-clip-text text-transparent">
                CivicRoot AI Command Center
              </h1>
              <p className="text-xs text-slate-400">Preventive Municipal Intelligence & Hotspot Analytics</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={handleSeedDemoData}
              disabled={seeding}
              className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 rounded-md text-xs font-medium text-indigo-200 flex items-center space-x-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding Demo Data...' : '⚡ Seed Demo Data'}</span>
            </button>
            <Link 
              to="/report" 
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-md text-xs font-semibold text-white transition"
            >
              Citizen View
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Grievances</p>
                <h3 className="text-3xl font-bold mt-2 text-white">{stats.totalComplaints}</h3>
              </div>
              <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center">
              <span className="text-emerald-400 font-semibold mr-1">100%</span> digitized via JanSetu
            </div>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI Hotspots Detected</p>
                <h3 className="text-3xl font-bold mt-2 text-amber-400">{hotspots.length}</h3>
              </div>
              <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              Clustered from disparate reports
            </div>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">High Risk Failures</p>
                <h3 className="text-3xl font-bold mt-2 text-red-400">
                  {hotspots.filter(h => h.riskScore?.toLowerCase() === 'high').length}
                </h3>
              </div>
              <div className="p-2.5 bg-red-500/10 rounded-lg text-red-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              Immediate preventive dispatch advised
            </div>
          </div>

          <div className="bg-[#1E293B] border border-slate-800 p-5 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resolution Rate</p>
                <h3 className="text-3xl font-bold mt-2 text-emerald-400">{stats.resolutionRate}%</h3>
              </div>
              <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              {stats.resolvedComplaints} closed, {stats.inProgressComplaints} in progress
            </div>
          </div>
        </div>

        {/* Civic Risk Visualizer & Heatmap Map Simulation */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center">
                <Layers className="w-5 h-5 mr-2 text-blue-400" />
                Live Civic Risk Density & Digital Twin Map
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Spatial aggregation of recurring complaints identifying localized systemic failures
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['All', 'Water Leak', 'Pothole', 'Streetlight', 'Garbage'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Grid visual */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {hotspots.length === 0 ? (
              <div className="text-center z-10 space-y-2">
                <MapPin className="w-8 h-8 text-slate-600 mx-auto animate-bounce" />
                <p className="text-sm text-slate-400">No active hotspots in this zone.</p>
                <button onClick={handleSeedDemoData} className="text-xs text-blue-400 underline font-medium">Click to inject test complaints</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full h-full p-2 z-10 overflow-y-auto">
                {filteredHotspots.map((spot, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-slate-800/90 border border-slate-700/80 rounded-lg flex flex-col justify-between hover:border-blue-500/60 transition shadow-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          spot.riskScore?.toLowerCase() === 'high' ? 'bg-red-500 animate-ping' : 'bg-amber-400'
                        }`} />
                        <span className="text-xs font-bold text-slate-200">{spot.category}</span>
                      </div>
                      {getRiskBadge(spot.riskScore)}
                    </div>
                    <div className="my-2">
                      <h4 className="text-sm font-semibold text-white line-clamp-1">{spot.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {spot.location}
                      </p>
                    </div>
                    <div className="text-xs text-blue-400 font-semibold bg-blue-950/60 border border-blue-900 px-2 py-1 rounded">
                      🔥 {spot.complaintCount} Connected Reports
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Emerging Service Failure Predictive Table */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
                CivicRoot AI Root Cause & Preventive Action Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Moving from isolated ticket response to systematic root-cause elimination
              </p>
            </div>
            <button 
              onClick={fetchData} 
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
              title="Refresh intelligence"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">Identified Civic Pattern</th>
                  <th className="py-3.5 px-6">Location & Density</th>
                  <th className="py-3.5 px-6">Severity Risk</th>
                  <th className="py-3.5 px-6">AI Root Cause Diagnosis</th>
                  <th className="py-3.5 px-6">Recommended Preventive Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredHotspots.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No pattern clusters generated yet. Submit complaints or click "Seed Demo Data" above.
                    </td>
                  </tr>
                ) : (
                  filteredHotspots.map((spot, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition">
                      <td className="py-4 px-6 font-semibold text-white">
                        {spot.title}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-200">{spot.location}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{spot.complaintCount} citizen reports linked</div>
                      </td>
                      <td className="py-4 px-6">
                        {getRiskBadge(spot.riskScore)}
                      </td>
                      <td className="py-4 px-6 max-w-xs text-slate-300">
                        {spot.rootCauseHypothesis}
                      </td>
                      <td className="py-4 px-6 max-w-xs text-emerald-300 font-medium">
                        🛡️ {spot.recommendedAction}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernmentDashboard;
