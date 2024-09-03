import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Approval() {
  const [requests, setRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [parentForms, setParentForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stationery requests
        const responseRequests = await axios.get('/api/requests');
        setRequests(responseRequests.data.data.reverse()); // Reverse the array

        // Fetch parent/guardian forms
        const responseParentForms = await axios.get('/api/parent');
        setParentForms(responseParentForms.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [showPopup]); // Trigger refetch when showPopup changes

  const handleApprove = async (id) => {
    try {
      await axios.post(`/api/requests/${id}/approve`);
      setRequests(prevRequests => {
        return prevRequests.map(request => {
          if (request._id === id) {
            return { ...request, status: 'Approved' };
          }
          return request;
        });
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error approving request: ", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/api/requests/${id}/reject`);
      setRequests(prevRequests => {
        return prevRequests.map(request => {
          if (request._id === id) {
            return { ...request, status: 'Rejected' };
          }
          return request;
        });
      });
    } catch (error) {
      console.error("Error rejecting request: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Stationery Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.map(request => (
          <div key={request._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Name: {request.name}</h2>
            <p><strong>Father's Name:</strong> {request.fatherName}</p>
            <p><strong>CNIC/B-Form:</strong> {request.cnicBForm}</p>
            <p><strong>Phone:</strong> {request.phone}</p>
            <p><strong>Address:</strong> {request.address}</p>
            <p><strong>Request For:</strong> {request.requestFor}</p>
            <p><strong>Description:</strong> {request.description}</p>
            <div className="mt-4">
              <button
                onClick={() => handleApprove(request._id)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(request._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
            {request.status && (
              <p className="mt-2 text-gray-700">
                Status: {request.status}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* Parent/Guardian Table */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">Parent/Guardian Forms</h1>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Name</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Father's Name</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Address</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Phone</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Request For</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">CNIC/B-Form</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Description</th>
              <th className="w-1/7 text-left py-3 px-4 uppercase font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {parentForms.map(form => (
              <tr key={form._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="text-left py-3 px-4">{form.name}</td>
                <td className="text-left py-3 px-4">{form.fatherName}</td>
                <td className="text-left py-3 px-4">{form.address}</td>
                <td className="text-left py-3 px-4">{form.phone}</td>
                <td className="text-left py-3 px-4">{form.requestFor}</td>
                <td className="text-left py-3 px-4">{form.cnicBForm}</td>
                <td className="text-left py-3 px-4">{form.description}</td>
                <td className="text-left py-3 px-4">
                  {/* Action buttons */}
                  <button
                    onClick={() => handleApprove(form._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(form._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Approval Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Request Approved</h2>
            <p>The request has been successfully approved.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
