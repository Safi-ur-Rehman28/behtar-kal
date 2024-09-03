import React, { useState } from 'react';

const FeedbackForm = () => {
  // State hooks for form data and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setLoading(false);
      setSuccessMessage('Feedback submitted successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <button type="submit" className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600 focus:bg-blue-600'}`}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </form>
  );
};

export default FeedbackForm;
