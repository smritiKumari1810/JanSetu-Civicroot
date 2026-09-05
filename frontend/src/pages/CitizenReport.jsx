import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Camera, Mic, CheckCircle } from 'lucide-react';

const CitizenReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send data to backend
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: 'citizen-123' })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] p-4 text-[#151C27] font-sans">
      <header className="mb-6 flex items-center">
        <h1 className="text-2xl font-bold text-[#1A56DB]">Report an Issue</h1>
      </header>

      {success ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm">
          <CheckCircle className="w-16 h-16 text-[#10B981] mb-4" />
          <h2 className="text-xl font-semibold">Complaint Submitted!</h2>
          <p className="text-gray-600 mt-2 text-center">Redirecting to your dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB]">
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Issue Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Broken Streetlight" 
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
              required
            >
              <option value="">Select a category</option>
              <option value="Pothole">Pothole</option>
              <option value="Water Leak">Water Leak</option>
              <option value="Streetlight">Streetlight</option>
              <option value="Garbage">Garbage</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <div className="relative">
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Address or Landmark" 
                className="w-full border border-gray-300 rounded p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
                required
              />
              <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide more details..." 
              className="w-full border border-gray-300 rounded p-3 h-24 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
              required
            ></textarea>
          </div>

          <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 flex justify-center space-x-6">
             <div className="flex flex-col items-center text-gray-500 hover:text-[#1A56DB] cursor-pointer">
               <Camera className="w-8 h-8 mb-2" />
               <span className="text-sm">Upload Photo</span>
             </div>
             <div className="flex flex-col items-center text-gray-500 hover:text-[#1A56DB] cursor-pointer">
               <Mic className="w-8 h-8 mb-2" />
               <span className="text-sm">Voice Note</span>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#F97316] text-white font-semibold rounded p-4 text-lg hover:bg-orange-600 disabled:opacity-70"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CitizenReport;
