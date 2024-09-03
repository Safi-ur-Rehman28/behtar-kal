import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackForm from './FeedbackForm';
const Dashparent = () => {
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [requestStatus, setRequestStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch submitted requests
        const responseRequests = await axios.get('/api/requests');
        setSubmittedRequests(responseRequests.data.data);

        // Fetch request status
        const responseStatus = await axios.get('/api/user/status');
        setRequestStatus(responseStatus.data.status);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submitted Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {submittedRequests.map((requestData, index) => (
          <div key={index} className="max-w-lg rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{requestData.name}</div>
              <p className="text-gray-700 text-base">
                <strong>Father's Name:</strong> {requestData.fatherName}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Address:</strong> {requestData.address}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Phone:</strong> {requestData.phone}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Request For:</strong> {requestData.requestFor}
              </p>
              <p className="text-gray-700 text-base">
                <strong>CNIC/B-Form:</strong> {requestData.cnicBForm}
              </p>
              <p className="text-gray-700 text-base">
                <strong>Description:</strong> {requestData.description}
              </p>
              {/* Conditional rendering for status */}
              <p className="text-base font-bold">
                {/* Check if status exists and render accordingly */}
                {requestData.status ? (
                  <span className={`inline-block px-2 py-1 rounded ${requestData.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                    {requestData.status}
                  </span>
                ) : (
                  <span className="text-gray-500">Status not available</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h3>Give a moment to and give feedback</h3>
      <FeedbackForm/>
    </div>
  );
};

export default Dashparent;
