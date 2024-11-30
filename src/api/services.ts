import { ServiceRequest } from '../types';
import { endpoints } from './config';

export async function fetchServiceRequests(): Promise<ServiceRequest[]> {
  const response = await fetch(endpoints.serviceRequests);
  if (!response.ok) {
    throw new Error('Failed to fetch service requests');
  }
  return response.json();
}

export async function createServiceRequest(data: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<ServiceRequest> {
  const response = await fetch(endpoints.serviceRequests, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create service request');
  }
  return response.json();
}