import { ServiceRequest, Customer } from '../types';

export const mockCustomer: Customer = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Gas Street, Energy City, EC 12345',
  accountNumber: 'GAS-001-2024',
};

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    type: 'gas_leak',
    status: 'in_progress',
    description: 'Detected gas smell in basement',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    customerId: '1',
  },
  {
    id: '2',
    type: 'billing',
    status: 'pending',
    description: 'Question about last month\'s bill',
    createdAt: '2024-03-14T15:00:00Z',
    updatedAt: '2024-03-14T15:00:00Z',
    customerId: '1',
  },
];