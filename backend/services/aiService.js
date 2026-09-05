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

async function analyzeComplaintsWithAI(complaints) {
  if (!complaints || complaints.length === 0) {
    return [];
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('No GEMINI_API_KEY provided in .env, using built-in intelligent clustering engine.');
    return heuristicClustering(complaints);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text ? response.text.trim() : '';
    // Clean up potential markdown formatting
    const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    console.error('Error calling Gemini API for clustering, using fallback:', error.message);
    return heuristicClustering(complaints);
  }
}

module.exports = {
  analyzeComplaintsWithAI,
  heuristicClustering
};
