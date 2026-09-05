import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MapPin, Clock } from 'lucide-react';

const TrackingDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch complaints for a dummy user ID 'citizen-123'
    fetch('http://localhost:5000/api/complaints/citizen-123')
      .then(res => res.json())
      .then(data => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch complaints", err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-[#D1FAE5] text-[#065F46]'; // Emerald
      case 'In Progress': return 'bg-[#FEF3C7] text-[#92400E]'; // Amber
      default: return 'bg-[#E0E7FF] text-[#3730A3]'; // Indigo for Pending
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] p-4 text-[#151C27] font-sans">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1A56DB]">My Reports</h1>
        <Link to="/report" className="flex items-center text-[#F97316] font-medium hover:underline">
          <PlusCircle className="w-5 h-5 mr-1" />
          New Report
        </Link>
      </header>

      {loading ? (
        <p className="text-gray-500">Loading your complaints...</p>
      ) : complaints.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E5E7EB] text-center">
          <p className="text-gray-500 mb-4">You haven't reported any issues yet.</p>
          <Link to="/report" className="bg-[#1A56DB] text-white px-6 py-2 rounded font-medium">Start a Report</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(complaint => (
            <div key={complaint._id} className="bg-white p-5 rounded-lg shadow-sm border border-[#E5E7EB]">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{complaint.title}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{complaint.category}</p>
              
              <div className="flex flex-col space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{complaint.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackingDashboard;
