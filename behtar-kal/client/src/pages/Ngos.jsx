import React from 'react';


export default function Ngos() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">Our NGO's Work</h1>
      
      <p className="mb-4">
        At <span className="font-semibold">Our NGO</span>, we are deeply committed to providing quality education to needy children in Pakistan. 
        We believe that education is the key to breaking the cycle of poverty and empowering these children to build a brighter future.
      </p>

      <img 
        
        alt="Needy Pakistani children" 
        className="w-full rounded-lg shadow-md mb-6"
      />

      <p className="mb-4">
        Through our various programs and initiatives, we aim to:
      </p>

      <ul className="list-disc pl-5 mb-6">
        <li>Identify and reach out to children from underprivileged backgrounds.</li>
        <li>Provide scholarships, school supplies, and educational resources.</li>
        <li>Offer support in the form of tutoring, mentorship, and career guidance.</li>
        <li>Collaborate with schools, educators, and local communities to create a supportive learning environment.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Purpose</h2>

      <p>
        Our primary purpose is to ensure that every child, regardless of their socio-economic status, has access to quality education. 
        We believe that education is a fundamental right and should not be a privilege reserved for a few.
      </p>

      <p className="mt-4">
        By focusing on education, we aim to empower these children with the knowledge, skills, and confidence they need to succeed academically and in life.
      </p>
      
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Support Our Cause
      </button>
    </div>
  );
}
