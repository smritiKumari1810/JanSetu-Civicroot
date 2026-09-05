process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../index');
const Complaint = require('../models/Complaint');

// Mock Complaint model for lightning-fast, zero-dependency testing
jest.mock('../models/Complaint');

describe('JanSetu + CivicRoot API Test Suite', () => {
  const originalApiKey = process.env.GEMINI_API_KEY;

  beforeAll(() => {
    delete process.env.GEMINI_API_KEY;
  });

  afterAll(() => {
    if (originalApiKey) process.env.GEMINI_API_KEY = originalApiKey;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Health Check Endpoint
  test('GET / should return healthy status message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('JanSetu + CivicRoot API is running');
  });

  // Test 2: Successful Complaint Submission with Cloudinary Media URLs
  test('POST /api/complaints should successfully save complaint with imageUrl and audioUrl', async () => {
    const payload = {
      title: 'Water pipe leak on Main St',
      category: 'Water Leak',
      description: 'Major leak causing low pressure across sector 4.',
      location: 'Sector 4, Main St',
      userId: 'citizen-99',
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      audioUrl: 'https://res.cloudinary.com/demo/video/upload/voice.webm'
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
    expect(res.body.imageUrl).toBe(payload.imageUrl);
    expect(res.body.audioUrl).toBe(payload.audioUrl);
  });

  // Test 3: Validation Error Handling
  test('POST /api/complaints should return 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/complaints')
      .send({ title: 'Incomplete complaint' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
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

  // Test 7: Cloudinary Image Upload
  test('POST /api/upload/image should process and return uploaded image URL', async () => {
    const dummyImageBuffer = Buffer.from('fake image content');
    const res = await request(app)
      .post('/api/upload/image')
      .attach('image', dummyImageBuffer, 'test-photo.jpg');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('url');
  });

  // Test 8: Cloudinary Voice Note Upload
  test('POST /api/upload/voice should process and return uploaded audio URL', async () => {
    const dummyAudioBuffer = Buffer.from('fake voice note content');
    const res = await request(app)
      .post('/api/upload/voice')
      .attach('voice', dummyAudioBuffer, 'test-voice.webm');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('url');
  });
});
