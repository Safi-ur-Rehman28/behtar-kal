import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStakeholder = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const response = await axios.get('/api/stakeholders');
        setStakeholders(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Stakeholder data:', err);
        setError('Failed to fetch Stakeholder data');
        setLoading(false);
      }
    };

    fetchStakeholders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Stakeholders</h2>
      <ul className="space-y-4">
        {stakeholders.map(stakeholder => (
          <li key={stakeholder._id} className="p-4 border rounded shadow-sm">
            <img src={stakeholder.profilePicture} alt={`${stakeholder.username}'s profile`} className="w-16 h-16 rounded-full mb-4" />
            <p><strong>Username:</strong> {stakeholder.username}</p>
            <p><strong>Email:</strong> {stakeholder.email}</p>
            <p><strong>Location:</strong> {stakeholder.location}</p>
            <p><strong>Contact:</strong> {stakeholder.contact}</p>
            <p><strong>Cnic:</strong> {stakeholder.cnic}</p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStakeholder;
