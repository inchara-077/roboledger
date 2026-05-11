import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  getRobotStatus: () => apiClient.get('/robot-status').then(res => res.data),
  getValidators: () => apiClient.get('/validators').then(res => res.data),
  getTasks: () => apiClient.get('/tasks').then(res => res.data),
};
