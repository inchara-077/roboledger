import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  getRobots: async () => {
    const response = await apiClient.get('/robot');
    return response.data;
  },

  getRobotStatus: async () => {
    const response = await apiClient.get('/robot');
    return response.data;
  },
};

export default apiClient;