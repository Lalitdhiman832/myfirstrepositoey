import axios from 'axios';

// Base API configuration
const API_URL = 'http://localhost:8000'; // Replace with actual backend URL
const USE_MOCK = false; // Set to false to use actual API

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const detectObjects = async (imageFile) => {
  if (USE_MOCK) {
    // Mock API response for demonstration purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            objects: [
              { label: 'Person', confidence: 0.95, box: [50, 50, 200, 300] },
              { label: 'Car', confidence: 0.88, box: [300, 100, 150, 100] },
            ]
          }
        });
      }, 1500); // Simulate network delay
    });
  }

  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await apiClient.post('/detect', formData);
    return response;
  } catch (error) {
    console.error('Error during detection API call:', error);
    throw error;
  }
};

export const fetchHistory = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            history: [
              { id: 1, date: '2026-05-03T10:00:00Z', objectCount: 2, imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80' },
              { id: 2, date: '2026-05-02T14:30:00Z', objectCount: 5, imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80' }
            ]
          }
        });
      }, 800);
    });
  }

  try {
    const response = await apiClient.get('/detections');
    return response;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};
