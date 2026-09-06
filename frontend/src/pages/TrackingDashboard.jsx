import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  MapPin, 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Timer, 
  Filter,
  Droplets,
  Construction,
  Lightbulb,
  Trash2,
  Zap,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case 'water leak':
    case 'water':
      return <Droplets className="w-4 h-4 text-blue-500" />;
    case 'pothole':
    case 'road':
      return <Construction className="w-4 h-4 text-amber-500" />;
    case 'streetlight':
      return <Lightbulb className="w-4 h-4 text-yellow-500" />;
    case 'garbage':
      return <Trash2 className="w-4 h-4 text-emerald-500" />;
    case 'electricity':
      return <Zap className="w-4 h-4 text-purple-500" />;
    default:
      return <HelpCircle className="w-4 h-4 text-slate-500" />;
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recently';
  }
};

const TrackingDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [error, setError] = useState(null);

  const fetchCitizenComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/complaints/citizen-123`);
      if (!res.ok) {
        throw new Error('Failed to fetch from server');
      }
      const data = await res.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('API error:', err.message);
      setError('Unable to reach the backend server. If deploying to Render, the instance may be waking up.');
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenComplaints();
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
            Resolved
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shrink-0">
            <Timer className="w-3 h-3 mr-1 text-blue-600" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
            <AlertCircle className="w-3 h-3 mr-1 text-amber-600" />
            Pending Review
          </span>
        );
    }
  };

  const filtered = complaints.filter(c => {
    const matchesFilter = selectedFilter === 'All' || c?.status === selectedFilter;
    const matchesSearch = (c?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c?.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c?.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F8FAFC] py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#1A56DB] mb-1">
              Citizen Tracking Console
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Grievance History</h1>
            <p className="text-xs text-slate-500 mt-0.5">Real-time status updates and municipal dispatch logs</p>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={fetchCitizenComplaints}
              disabled={loading}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
              title="Refresh complaints"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              to="/report"
              className="px-4 sm:px-5 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center space-x-1.5 shadow-md shadow-orange-500/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>File New Report</span>
            </Link>
          </div>
        </div>

        {/* Server Connection Error Alert if server is offline */}
        {error && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={fetchCitizenComplaints} className="font-bold underline text-[#1A56DB] cursor-pointer">Retry Connection</button>
          </div>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, location, or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap space-x-1 bg-slate-200/80 p-1 rounded-xl">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedFilter === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints Feed */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <Timer className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium">Fetching your live grievance records from database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Grievances Recorded</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't reported any civic issues yet, or no complaints match your search query.
            </p>
            <Link 
              to="/report" 
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#1A56DB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report an Issue Now</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item._id || Math.random()}
                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center space-x-2.5">
                    <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5 sm:mt-0">
                      {getCategoryIcon(item?.category)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          #JS-{item?._id ? item._id.slice(-4).toUpperCase() : '8821'}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-600">{item?.category || 'Civic Issue'}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        {item?.title || 'Civic Grievance'}
                      </h3>
                    </div>
                  </div>
                  {getStatusBadge(item?.status)}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {item?.description || 'No additional description provided.'}
                </p>

                {/* Attached Media Previews */}
                {(item?.imageUrl || item?.audioUrl) && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {item?.imageUrl && (
                      <a 
                        href={item.imageUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
                      >
                        <span>📷 View Attached Photo</span>
                      </a>
                    )}
                    {item?.audioUrl && (
                      <div className="flex flex-wrap items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 max-w-full">
                        <span className="text-xs font-semibold text-slate-700 shrink-0">🎙️ Voice Note:</span>
                        <audio src={item.audioUrl} controls className="h-6 w-40 sm:w-48 max-w-full" />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{item?.location || 'General Location'}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(item?.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingDashboard;
