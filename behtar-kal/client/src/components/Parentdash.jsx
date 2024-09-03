import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Parentdash() {
  const [latestRequest, setLatestRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the latest request data from the backend
    axios.get('/api/parent/latest')
      .then(response => {
        setLatestRequest(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async () => {
    try {
      const newStatus = latestRequest.status === 'Pending' ? 'Approved' : 'Pending';
      const updatedRequest = { ...latestRequest, status: newStatus };
      await axios.put(`/api/parent/${latestRequest._id}`, updatedRequest);
      setLatestRequest(updatedRequest);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Request</h1>
      {latestRequest ? (
        <div className="max-w-lg rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{latestRequest.name}</div>
            <p className="text-gray-700 text-base">
              <strong>Father's Name:</strong> {latestRequest.fatherName}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Address:</strong> {latestRequest.address}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Phone:</strong> {latestRequest.phone}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Request For:</strong> {latestRequest.requestFor}
            </p>
            <p className="text-gray-700 text-base">
              <strong>CNIC/B-Form:</strong> {latestRequest.cnicBForm}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Status:</strong> {latestRequest.status}
            </p>
            <div className="mt-4">
              <button onClick={handleStatusChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">{latestRequest.status === 'Pending' ? 'Approve' : 'Pending'}</button>
            </div>
          </div>
        </div>
      ) : (
        <div>No requests found</div>
      )}
    </div>
  );
}
