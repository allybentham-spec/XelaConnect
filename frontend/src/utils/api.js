import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('session_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API methods
export const circlesAPI = {
  getAll: (category) => {
    const params = category && category !== 'All' ? { category } : {};
    return api.get('/circles', { params });
  },
  getById: (id) => api.get(`/circles/${id}`),
  join: (id) => api.post(`/circles/${id}/join`),
  leave: (id) => api.post(`/circles/${id}/leave`),
};

export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  get: (id) => api.get(`/courses/${id}`),
  checkEnrollment: (id) => api.get(`/courses/${id}/enrollment`),
  enroll: (id) => api.post(`/courses/${id}/enroll`),
  getContent: (id) => api.get(`/courses/${id}/content`),
  getProgress: (id) => api.get(`/courses/${id}/progress`),
  markComplete: (courseId, lessonId) => api.post(`/courses/${courseId}/lessons/${lessonId}/complete`),
};

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  googleAuth: (sessionId) => api.post('/auth/google', { session_id: sessionId }),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const userAPI = {
  getDashboard: () => api.get('/users/dashboard'),
  updateProfile: (data) => api.put('/users/profile', data),
  getReferralData: () => api.get('/users/referral'),
};

export const discoverAPI = {
  getPeople: () => api.get('/discover'),
};

export const connectionsAPI = {
  sendRequest: (userId) => api.post('/connections/request', { user_id: userId }),
  accept: (connectionId) => api.post(`/connections/${connectionId}/accept`),
  getAll: () => api.get('/connections'),
};

export const xelaTalksAPI = {
  getConversation: () => api.get('/xelatalks'),
  sendMessage: (message) => api.post('/xelatalks/message', { message }),
};

export const activityAPI = {
  getAll: () => api.get('/activity'),
  markRead: (id) => api.post(`/activity/${id}/mark-read`),
};

export const reflectionsAPI = {
  create: (data) => api.post('/reflections', data),
  getAll: () => api.get('/reflections'),
  getPublic: (limit) => api.get('/reflections/public', { params: { limit } }),
  getById: (id) => api.get(`/reflections/${id}`),
  update: (id, data) => api.put(`/reflections/${id}`, data),
  delete: (id) => api.delete(`/reflections/${id}`),
};

export default api;
