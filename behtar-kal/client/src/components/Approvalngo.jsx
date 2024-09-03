import React, { useState, useEffect } from 'react';

export default function Approvalngo() {
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {
    async function fetchApprovedRequests() {
      try {
        const response = await fetch('/api/approved-requests'); // Assuming your backend is running on the same host
        if (!response.ok) {
          throw new Error('Failed to fetch approved requests');
        }
        const data = await response.json();
        setApprovedRequests(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchApprovedRequests();
  }, []);

  return (
    <div>
      <h2>Approved Requests</h2>
      <ul>
        {approvedRequests.length > 0 ? (
          approvedRequests.map((request, index) => (
            <li key={index}>
              <p>Name: {request.name}</p>
              <p>Father's Name: {request.fatherName}</p>
              <p>Address: {request.address}</p>
              <p>Phone: {request.phone}</p>
              <p>Request For: {request.requestFor}</p>
              <p>CNIC/B-Form: {request.cnicBForm}</p>
              <p>Description: {request.description}</p>
              <p>Approved By: {request.approvedBy}</p>
            </li>
          ))
        ) : (
          <p>No approved requests found</p>
        )}
      </ul>
    </div>
  );
}
