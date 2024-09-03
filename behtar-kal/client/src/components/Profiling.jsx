import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profiling() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/donations')
      .then(response => {
        setDonations(response.data);
      })
      .catch(error => {
        console.error('Error fetching donations:', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Donations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map(donation => (
          <div key={donation._id} className="border rounded-md p-4 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{donation.donorName}</h2>
            <p className="text-gray-700 mb-2">Amount: {donation.amount}</p>
            <p className="text-gray-700 mb-2">Date: {donation.date}</p>
            <p className="text-gray-700 mb-2">Description: {donation.description}</p>
            <div className="mt-2">
              <p className="text-gray-700 mb-1">Records:</p>
              <ul>
                {donation.records.map(record => (
                  <li key={record._id} className="mb-1">
                    <div className="text-sm text-gray-600">Description: {record.description}</div>
                    <div className="text-sm text-gray-600">Progress: {record.progress}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
