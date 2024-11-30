export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const endpoints = {
  serviceRequests: `${API_BASE_URL}/service-requests/`,
  customers: `${API_BASE_URL}/customers/`,
};