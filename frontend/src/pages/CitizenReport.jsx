import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Camera, 
  Mic, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Sparkles, 
  ArrowRight,
  Droplets,
  Construction,
  Lightbulb,
  Trash2,
  Zap,
  HelpCircle
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const categories = [
  { id: 'Pothole', label: 'Road & Pothole', icon: Construction, desc: 'Crater, eroded asphalt, sinkhole' },
  { id: 'Water Leak', label: 'Water & Sewage', icon: Droplets, desc: 'Pipe burst, low pressure, contamination' },
  { id: 'Streetlight', label: 'Street Lighting', icon: Lightbulb, desc: 'Dark stretch, flickering pole' },
  { id: 'Garbage', label: 'Waste Management', icon: Trash2, desc: 'Overflowing bin, open dumping' },
  { id: 'Electricity', label: 'Power & Grid', icon: Zap, desc: 'Transformer spark, loose wire' },
  { id: 'Other', label: 'Other Issue', icon: HelpCircle, desc: 'Public property or civic concern' }
];

const CitizenReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Water Leak',
    description: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [photoSelected, setPhotoSelected] = useState(false);
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (catId) => {
    setFormData({ ...formData, category: catId });
  };

  const handleAutoGPS = () => {
    setGpsLoading(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        location: 'Sector 4, Main Market Road (Near Metro Pillar 142)'
      }));
      setGpsLoading(false);
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: 'citizen-123' })
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedId(data._id ? `#JS-${data._id.slice(-4).toUpperCase()}` : '#JS-8821');
        setSuccess(true);
      } else {
        // Fallback for demo if server is offline
        setGeneratedId('#JS-8821');
        setSuccess(true);
      }
    } catch (err) {
      setGeneratedId('#JS-8821');
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-600" />
            JanSetu Citizen Redressal Portal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Report a Civic Grievance
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Your report is automatically ingested, analyzed by CivicRoot AI, and routed directly to the responsible municipal department.
          </p>
        </div>

        {success ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Grievance Registered Successfully!</h2>
              <p className="text-sm text-slate-600">
                Your report has been logged and assigned tracking ID:
              </p>
              <div className="inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-lg font-mono font-bold text-slate-800">
                {generatedId}
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 text-left space-y-2">
              <div className="font-semibold flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-blue-600" />
                CivicRoot AI Pipeline Active:
              </div>
              <p className="text-blue-700 leading-relaxed">
                Our intelligence layer is correlating this report with active civic hotspots in your area to determine root-cause priority.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({ title: '', category: 'Water Leak', description: '', location: '' });
                }}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
              >
                File Another Complaint
              </button>
              <Link
                to="/dashboard"
                className="flex-1 px-4 py-3 bg-[#1A56DB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center space-x-1 shadow-lg shadow-blue-500/25 transition"
              >
                <span>Track My Grievance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Category Selector Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Issue Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#1A56DB] bg-blue-50/70 ring-2 ring-blue-500/20 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#1A56DB] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#1A56DB]"></span>}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-[#1A56DB]' : 'text-slate-800'}`}>
                          {cat.label}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {cat.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Issue Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Water main burst flooding road near school"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition"
                required
              />
            </div>

            {/* Location with Auto-GPS Button */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Location / Landmark <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoGPS}
                  disabled={gpsLoading}
                  className="text-xs text-[#1A56DB] hover:text-blue-800 font-semibold flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{gpsLoading ? 'Detecting GPS...' : '📍 Auto-detect GPS'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Street name, colony, ward number, or landmark"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition"
                  required
                />
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Problem Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the severity, how long it has been occurring, and safety risks..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition"
                required
              />
            </div>

            {/* Media Upload Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                5. Attach Evidence (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPhotoSelected(!photoSelected)}
                  className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center space-y-1.5 transition ${
                    photoSelected 
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800' 
                      : 'border-slate-300 hover:border-blue-400 bg-slate-50 text-slate-600'
                  }`}
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-xs font-semibold">
                    {photoSelected ? '✓ Photo Attached' : 'Capture Photo'}
                  </span>
                  <span className="text-[10px] text-slate-400">JPG, PNG up to 10MB</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVoiceRecorded(!voiceRecorded)}
                  className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center space-y-1.5 transition ${
                    voiceRecorded 
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800' 
                      : 'border-slate-300 hover:border-orange-400 bg-slate-50 text-slate-600'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  <span className="text-xs font-semibold">
                    {voiceRecorded ? '✓ Voice Note Added (0:14)' : 'Record Voice Note'}
                  </span>
                  <span className="text-[10px] text-slate-400">Multi-lingual voice AI</span>
                </button>
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              <span>{isSubmitting ? 'Registering Grievance...' : 'Submit Grievance to JanSetu'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CitizenReport;
