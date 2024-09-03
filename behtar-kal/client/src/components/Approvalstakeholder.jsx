import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

export default function Approvalstakeholder() {
  const [requests, setRequests] = useState([]); // State to store approval requests

  useEffect(() => {
    // Function to fetch approval requests
    const fetchRequests = async () => {
      try {
        // Make a GET request to fetch approval requests from the backend
        const response = await axios.get('/api/approval-requests');

        // Sort the approval requests by timestamp (assuming there's a timestamp field)
        const sortedRequests = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Set the fetched and sorted approval requests in component state
        setRequests(sortedRequests);
      } catch (error) {
        console.error('Error fetching approval requests:', error);
      }
    };

    // Call the fetchRequests function when the component mounts
    fetchRequests();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Approval Requests from Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map over the approval requests and display them */}
        {requests.map((request) => (
          <div key={request._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-2">{request.name}</h2>
            <p><span className="font-bold">Father's Name:</span> {request.fatherName}</p>
            <p><span className="font-bold">Address:</span> {request.address}</p>
            <p><span className="font-bold">Phone:</span> {request.phone}</p>
            <p><span className="font-bold">Request For:</span> {request.requestFor}</p>
            <p><span className="font-bold">CNIC/B-Form:</span> {request.cnicBForm}</p>
            <p><span className="font-bold">Status:</span> {request.status}</p>
            <p><span className="font-bold">Description:</span> {request.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
