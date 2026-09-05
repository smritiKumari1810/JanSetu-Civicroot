process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../index');
const Complaint = require('../models/Complaint');
const { heuristicClustering } = require('../services/aiService');

// Mock Complaint model for lightning-fast, zero-dependency testing
jest.mock('../models/Complaint');

describe('JanSetu + CivicRoot API Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Health Check Endpoint
  test('GET / should return healthy status message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('JanSetu + CivicRoot API is running');
  });

  // Test 2: Successful Complaint Submission
  test('POST /api/complaints should successfully save and return new complaint', async () => {
    const payload = {
      title: 'Water pipe leak on Main St',
      category: 'Water Leak',
      description: 'Major leak causing low pressure across sector 4.',
      location: 'Sector 4, Main St',
      userId: 'citizen-99'
    };

    const mockSavedComplaint = {
      ...payload,
      _id: 'mock-complaint-id-123',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    Complaint.prototype.save = jest.fn().mockResolvedValue(mockSavedComplaint);

    const res = await request(app)
      .post('/api/complaints')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id', 'mock-complaint-id-123');
    expect(res.body.title).toBe(payload.title);
    expect(res.body.status).toBe('Pending');
  });

  // Test 3: Validation Error Handling
  test('POST /api/complaints should handle database save errors with 500 status', async () => {
    Complaint.prototype.save = jest.fn().mockRejectedValue(new Error('Validation error: missing field'));

    const res = await request(app)
      .post('/api/complaints')
      .send({ title: 'Incomplete complaint' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to submit complaint');
  });

  // Test 4: Retrieve Citizen Specific History
  test('GET /api/complaints/:userId should fetch complaints for that citizen', async () => {
    const mockComplaints = [
      { _id: '1', title: 'Pothole 1', category: 'Pothole', location: 'Zone A', userId: 'user-A', status: 'Pending' },
      { _id: '2', title: 'Pothole 2', category: 'Pothole', location: 'Zone B', userId: 'user-A', status: 'In Progress' }
    ];

    Complaint.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockComplaints)
    });

    const res = await request(app).get('/api/complaints/user-A');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0].userId).toBe('user-A');
  });

  // Test 5: AI Intelligence Hotspot Clustering Engine
  test('GET /api/intelligence/hotspots should group recurring complaints into actionable hotspots', async () => {
    const mockDataset = [
      { _id: '1', title: 'Water issue 1', category: 'Water Leak', location: 'Park Lane', createdAt: new Date() },
      { _id: '2', title: 'Water issue 2', category: 'Water Leak', location: 'Park Lane', createdAt: new Date() },
      { _id: '3', title: 'Water issue 3', category: 'Water Leak', location: 'Park Lane', createdAt: new Date() },
      { _id: '4', title: 'Streetlight out', category: 'Streetlight', location: 'Highway 5', createdAt: new Date() }
    ];

    Complaint.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockDataset)
    });

    const res = await request(app).get('/api/intelligence/hotspots');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.totalComplaintsAnalyzed).toBe(4);
    expect(Array.isArray(res.body.hotspots)).toBe(true);

    const parkLaneSpot = res.body.hotspots.find(h => h.location === 'Park Lane');
    expect(parkLaneSpot).toBeDefined();
    expect(parkLaneSpot.complaintCount).toBe(3);
    expect(parkLaneSpot.riskScore).toBe('High');
  });

  // Test 6: Summary KPI Stats Computation
  test('GET /api/intelligence/stats should compute accurate citywide KPI metrics', async () => {
    Complaint.countDocuments = jest.fn()
      .mockResolvedValueOnce(10) // Total
      .mockResolvedValueOnce(6)  // Resolved
      .mockResolvedValueOnce(2)  // In Progress
      .mockResolvedValueOnce(2); // Pending

    const res = await request(app).get('/api/intelligence/stats');
    expect(res.statusCode).toBe(200);
    expect(res.body.totalComplaints).toBe(10);
    expect(res.body.resolvedComplaints).toBe(6);
    expect(res.body.inProgressComplaints).toBe(2);
    expect(res.body.pendingComplaints).toBe(2);
    expect(res.body.resolutionRate).toBe(60);
  });
});
