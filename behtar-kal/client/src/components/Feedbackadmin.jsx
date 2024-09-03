import React, { useState, useEffect } from 'react';

export default function Feedbackadmin() {
  // State to hold the feedback data
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedback data from the server
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Send request to fetch feedback data from the server
        const response = await fetch('/api/feedback'); // Replace '/api/feedback' with your actual endpoint
        const data = await response.json();
        if (response.ok) {
          setFeedbackData(data);
        } else {
          console.error('Error fetching feedback:', data.message);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback(); // Call the fetchFeedback function when the component mounts
  }, []);

  // Render loading state while data is being fetched
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Render feedback data
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Feedback Admin</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {feedbackData.map((feedback) => (
          <div key={feedback._id} className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-xl font-semibold">{feedback.name}</h3>
            <p className="text-gray-600 mb-2">{feedback.email}</p>
            <p className="text-gray-700">{feedback.message}</p>
            <p className="text-sm text-gray-500 mt-4">Submitted on {new Date(feedback.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
