import React, { useEffect, useState } from 'react';

export default function NgoStudentpro() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    username: '',
    email: '',
    location: '',
    contact: '',
    uniqueId: '',
    description: '',
    availableItems: []
  });
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditStudent({ ...editStudent, [name]: value });
    } else {
      setNewStudent({ ...newStudent, [name]: value });
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      fetchStudents();
      setNewStudent({
        username: '',
        email: '',
        location: '',
        contact: '',
        uniqueId: '',
        description: '',
        availableItems: []
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/students/${editStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editStudent)
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      fetchStudents();
      setEditStudent(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      fetchStudents();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gradient bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
        Student Avail Items
      </h1>

      <form onSubmit={addStudent} className="mb-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          Add New Student
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newStudent.username}
          onChange={(e) => handleInputChange(e)}
          required
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => handleInputChange(e)}
          required
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newStudent.location}
          onChange={(e) => handleInputChange(e)}
          required
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newStudent.contact}
          onChange={(e) => handleInputChange(e)}
          required
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="uniqueId"
          placeholder="Unique ID"
          value={newStudent.uniqueId}
          onChange={(e) => handleInputChange(e)}
          required
          className="block w-full p-2 border rounded mb-4"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newStudent.description}
          onChange={(e) => handleInputChange(e)}
          className="block w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Add Student
        </button>
      </form>

      {editStudent && (
        <form onSubmit={updateStudent} className="mb-10 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
            Edit Student
          </h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={editStudent.username}
            onChange={(e) => handleInputChange(e, true)}
            required
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editStudent.email}
            onChange={(e) => handleInputChange(e, true)}
            required
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editStudent.location}
            onChange={(e) => handleInputChange(e, true)}
            required
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={editStudent.contact}
            onChange={(e) => handleInputChange(e, true)}
            required
            className="block w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            name="uniqueId"
            placeholder="Unique ID"
            value={editStudent.uniqueId}
            onChange={(e) => handleInputChange(e, true)}
            required
            className="block w-full p-2 border rounded mb-4"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editStudent.description}
            onChange={(e) => handleInputChange(e, true)}
            className="block w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition">
            Update Student
          </button>
          <button type="button" onClick={() => setEditStudent(null)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition ml-4">
            Cancel
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map(student => (
          <div key={student._id} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
              {student.username}
            </h2>
            <div className="flex items-center mb-2">
              <i className="fas fa-envelope mr-2 text-blue-400"></i>
              <p className="font-semibold">{student.email}</p>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-map-marker-alt mr-2 text-red-400"></i>
              <p className="font-semibold">{student.location}</p>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-phone mr-2 text-green-400"></i>
              <p className="font-semibold">{student.contact}</p>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-id-badge mr-2 text-purple-400"></i>
              <p className="font-semibold">{student.uniqueId}</p>
            </div>
            <h3 className="text-xl font-semibold mt-4 mb-2">Avail Items:</h3>
            
            <ul> <li className="mb-4">{student.description}  </li></ul>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setEditStudent(student)} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition">
                Edit
              </button>
              <button onClick={() => deleteStudent(student._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
