export interface ServiceRequest {
  id: string;
  type: 'gas_leak' | 'billing' | 'connection' | 'maintenance' | 'other';
  status: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  description: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  customerId: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  accountNumber: string;
}