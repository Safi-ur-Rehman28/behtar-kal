import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Adminngo = () => {
  const [ngos, setNgos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get('/api/ngos');
        setNgos(response.data.data);
      } catch (error) {
        console.error('Error fetching NGO data:', error);
        setError('Failed to load NGO data');
      }
    };

    fetchNgos();
  }, []);

  return (
    <div className=" container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">NGO List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {ngos.map((ngo) => (
          <div key={ngo.uniqueId} className="p-4 border rounded shadow-sm">
            <img src={ngo.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mb-4" />
            <p><strong>Username:</strong> {ngo.username}</p>
            <p><strong>Email:</strong> {ngo.email}</p>
            <p><strong>Location:</strong> {ngo.location}</p>
            <p><strong>Contact:</strong> {ngo.contact}</p>
            <p><strong>Unique Id:</strong> {ngo.uniqueId}</p>
            {ngo.cnicUrl && <p><strong>CNIC URL:</strong> <a href={ngo.cnicUrl} target="_blank" rel="noopener noreferrer">View CNIC</a></p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adminngo;
