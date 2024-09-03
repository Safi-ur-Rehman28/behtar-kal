import React, { useState, useEffect } from 'react';
import axios from 'axios';
;

const ProgressofStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    address: '',
    phone: '',
    requestFor: '',
    description: '',
    cnicBForm: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null); // To store submitted data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/submit-form', formData);
      alert('Request submitted successfully');
      const submittedRequests = JSON.parse(localStorage.getItem('submittedRequests')) || [];
      submittedRequests.push(formData);
      localStorage.setItem('submittedRequests', JSON.stringify(submittedRequests)); // Store all submitted requests in local storage
      resetFormData();
    } catch (error) {
      let errorMessage = 'Failed to submit request. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || 'Server error';
        setErrors(error.response.data.errors); // Assuming server sends errors in this format
      } else if (error.request) {
        errorMessage = 'No response from server. Check your internet connection.';
      } else {
        errorMessage = 'An unexpected error occurred.';
      }

      console.error(errorMessage);
      alert(errorMessage);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      fatherName: '',
      address: '',
      phone: '',
      requestFor: '',
      cnicBForm: '',
      description: '',
    });
    setErrors({});
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Request Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name:</label>
          <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="fatherName" className="block text-sm font-medium">Father's Name:</label>
          <input id="fatherName" type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="cnicBForm" className="block text-sm font-medium">CNIC/B-Form:</label>
          <input id="cnicBForm" type="text" name="cnicBForm" value={formData.cnicBForm} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone:</label>
          <input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address:</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <div>
          <label htmlFor="requestFor" className="block text-sm font-medium">Request For:</label>
          <select id="requestFor" name="requestFor" value={formData.requestFor} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select</option>
            <option value="stationary">Stationary</option>
            <option value="accessories">Accessories</option>
            <option value="scholarships">Scholarships</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        {Object.keys(errors).map((fieldName) => (
          <p key={fieldName} className="text-red-500">{errors[fieldName]}</p>
        ))}
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Submit
        </button>
      </form>
      {submittedData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
          <ul>
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default ProgressofStudent;
