// Dynamic API configuration for Vercel -> Render communication
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') 
  : 'http://localhost:5000';
