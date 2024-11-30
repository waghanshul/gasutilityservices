import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import { ServiceRequest } from '../types';
import { fetchServiceRequests } from '../api/services';

const statusIcons = {
  pending: <Clock className="text-yellow-500" />,
  in_progress: <AlertCircle className="text-blue-500" />,
  resolved: <CheckCircle className="text-green-500" />,
  cancelled: <XCircle className="text-red-500" />,
};

const RequestList: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchServiceRequests();
      setRequests(data);
      setError(null);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
        <RefreshCw className="animate-spin text-blue-600" />
        <span className="ml-2">Loading requests...</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Requests</h2>
        <button
          onClick={loadRequests}
          className="text-blue-600 hover:text-blue-800"
          title="Refresh requests"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No requests found</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {statusIcons[request.status]}
                  <span className="font-semibold capitalize">
                    {request.type.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{request.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                Status: <span className="capitalize">{request.status.replace('_', ' ')}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestList;