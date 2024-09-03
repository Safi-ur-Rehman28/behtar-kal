import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Donateform() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [student, setStudent] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [address, setAddress] = useState("");
  const [easyPaisa, setEasyPaisa] = useState("");
  const [bankTransfer, setBankTransfer] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!student.trim()) {
      errors.student = "Student name is required";
    } else if (student.trim().length < 6) {
      errors.student = "Student name must be at least 6 characters";
    }

    if (!studentNumber.trim()) {
      errors.studentNumber = "Student phone number is required";
    } else if (studentNumber.trim().length !== 10) {
      errors.studentNumber = "Student phone number must be of 10 digits";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      errors.email = "Invalid email format";
    }

    if (!purpose) {
      errors.purpose = "Please select a purpose";
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Reset form fields after successful submission
    setStudent("");
    setStudentNumber("");
    setAddress("");
    setEasyPaisa("");
    setBankTransfer("");
    setEmail("");
    setPurpose("");

    // Simulating successful submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">
        <Link to="/" className="text-decoration-none text-blue-500">
          DONATE<span className="text-red-500">❤️</span>
        </Link>
      </h1>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          DONATE Online
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-600">
              Full Name:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              id="studentName"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="studentNumber" className="block text-sm font-medium text-gray-600">
              Phone Number:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              id="studentNumber"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">
              Address:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-600">
              Donation Purpose:
            </label>
            <select
              id="purpose"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            >
              <option value="">Select Purpose</option>
              <option value="Educational">Educational</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="easyPaisa" className="block text-sm font-medium text-gray-600">
              Easy Paisa Number:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              id="easyPaisa"
              value={easyPaisa}
              onChange={(e) => setEasyPaisa(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bankTransfer" className="block text-sm font-medium text-gray-600">
              Bank Transfer Details:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-md border-gray-300"
              id="bankTransfer"
              value={bankTransfer}
              onChange={(e) => setBankTransfer(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Confirm Donation
          </button>
          <p className={`mt-3 ${isSubmitted ? 'block' : 'hidden'}`}>
            Donation details have been submitted successfully.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Donateform;
