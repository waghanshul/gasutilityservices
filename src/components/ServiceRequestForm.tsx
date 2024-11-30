import React, { useState } from 'react';
import { AlertTriangle, FileText, Send } from 'lucide-react';
import { createServiceRequest } from '../api/services';
import { mockCustomer } from '../api/mockData';

const ServiceRequestForm: React.FC = () => {
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createServiceRequest({
        type: type as any,
        description,
        customerId: mockCustomer.id,
      });
      
      // Reset form
      setType('');
      setDescription('');
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Service Request</h2>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Request Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select type</option>
          <option value="gas_leak">Gas Leak</option>
          <option value="billing">Billing Issue</option>
          <option value="connection">New Connection</option>
          <option value="maintenance">Maintenance</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={18} />
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
        
        {type === 'gas_leak' && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={18} />
            <span className="text-sm">For immediate gas leak assistance, please call our emergency line!</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <FileText size={18} />
        <span>You can attach files after creating the request</span>
      </div>
    </form>
  );
};

export default ServiceRequestForm;