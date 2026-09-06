const { GoogleGenAI } = require('@google/genai');

// Heuristic fallback in case GEMINI_API_KEY is not configured yet
function heuristicClustering(complaints) {
  const clusters = {};

  complaints.forEach((c) => {
    const key = `${c.category || 'General'}-${c.location || 'Citywide'}`;
    if (!clusters[key]) {
      clusters[key] = {
        title: `${c.category} Issue cluster at ${c.location}`,
        category: c.category,
        location: c.location,
        complaintCount: 0,
        complaintIds: [],
        riskScore: 'Medium',
        rootCauseHypothesis: `Recurring ${c.category.toLowerCase()} reports indicating localized infrastructure stress.`,
        recommendedAction: `Deploy inspection crew to survey ${c.location} and initiate proactive maintenance.`,
        lastReportedAt: c.createdAt || new Date()
      };
    }
    clusters[key].complaintCount += 1;
    clusters[key].complaintIds.push(c._id);
  });

  const results = Object.values(clusters).map((cluster) => {
    if (cluster.complaintCount >= 3) {
      cluster.riskScore = 'High';
      cluster.rootCauseHypothesis = `Severe clustering detected: ${cluster.complaintCount} reports at ${cluster.location}. High likelihood of systemic pipeline or grid failure.`;
      cluster.recommendedAction = `Immediate cross-departmental dispatch. Prioritize structural repair over single-ticket patching.`;
    } else if (cluster.complaintCount === 1) {
      cluster.riskScore = 'Low';
    }
    return cluster;
  });

  return results.sort((a, b) => b.complaintCount - a.complaintCount);
}

// Secondary Fallback: Groq Cloud API (Llama 3.3 / Llama 3.1)
async function callGroqAI(complaints) {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    throw new Error('GROQ_API_KEY not configured');
  }

  const prompt = `You are the CivicRoot AI civic intelligence engine.
Analyze the following list of citizen complaints and convert them from isolated tickets into preventive civic intelligence.

Citizen Complaints Data:
${JSON.stringify(complaints.map(c => ({ id: c._id, title: c.title, category: c.category, description: c.description, location: c.location, date: c.createdAt })), null, 2)}

Provide a structured JSON array of hotspot clusters. Each cluster must have:
- title: Short description of the clustered issue
- category: Main category (Water Leak, Pothole, Streetlight, Garbage, Electricity, etc.)
- location: General area/neighborhood
- complaintCount: Number of complaints matching this pattern (number)
- riskScore: "High" | "Medium" | "Low"
- rootCauseHypothesis: Deep civic analysis explaining why this is happening
- recommendedAction: Preventive action for city officials

Return ONLY a valid JSON array of objects. Do not include markdown formatting or extra text.`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${groqApiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert civic infrastructure intelligence engine. You strictly return a valid JSON array of clustered civic hotspots.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error status ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '[]';
  const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return Array.isArray(parsed) ? parsed : (parsed.hotspots || parsed.clusters || []);
}

async function analyzeComplaintsWithAI(complaints) {
  if (!complaints || complaints.length === 0) {
    return [];
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  // 1. Primary AI Tier: Google Gemini
  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const prompt = `
You are the CivicRoot AI civic intelligence engine.
Analyze the following list of citizen complaints and convert them from isolated tickets into preventive civic intelligence.

Citizen Complaints Data:
${JSON.stringify(complaints.map(c => ({ id: c._id, title: c.title, category: c.category, description: c.description, location: c.location, date: c.createdAt })), null, 2)}

Provide a structured JSON array of hotspot clusters. Each cluster must have:
- title: Short description of the clustered issue
- category: Main category (Water, Road, Electricity, Sanitation, etc.)
- location: General area/neighborhood
- complaintCount: Number of complaints matching this pattern
- riskScore: 'High' | 'Medium' | 'Low'
- rootCauseHypothesis: Deep civic analysis explaining why this is happening
- recommendedAction: Preventive action for city officials

Return ONLY a valid JSON array. No markdown fences, no explanatory text.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const responseText = response.text ? response.text.trim() : '';
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (error) {
      console.warn('Primary Tier (Gemini) failed or rate-limited:', error.message);
    }
  }

  // 2. Secondary AI Tier: Groq Cloud API (Llama 3.3 / 3.1)
  if (groqKey) {
    try {
      console.log('Activating Secondary Tier: Groq AI (Llama 3.3)...');
      const groqResults = await callGroqAI(complaints);
      if (Array.isArray(groqResults) && groqResults.length > 0) {
        return groqResults;
      }
    } catch (groqError) {
      console.warn('Secondary Tier (Groq) failed or unavailable:', groqError.message);
    }
  }

  // 3. Tertiary Offline Tier: Local Heuristic Clustering Algorithm
  if (!geminiKey && !groqKey) {
    console.log('No external AI keys provided. Using built-in intelligent clustering engine.');
  } else {
    console.log('External AI APIs unavailable. Gracefully switched to built-in clustering engine.');
  }

  return heuristicClustering(complaints);
}

module.exports = {
  analyzeComplaintsWithAI,
  heuristicClustering,
  callGroqAI
};
