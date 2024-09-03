import React from 'react';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">About Our Initiative</h1>
      
      <p className="mb-4">
        At <span className="font-semibold">Our Initiative</span>, we believe that education is a fundamental right for every child, regardless of their socio-economic background. 
        Our mission is to provide quality education to needy children who might otherwise be deprived of this opportunity.
      </p>

      <p className="mb-4">
        Through our partnerships with schools, educators, and community leaders, we identify children in need and provide them with the necessary resources, including school supplies, 
        uniforms, and tuition fees.
      </p>

      <p className="mb-4">
        We're committed to creating a positive impact in the lives of these children by empowering them with knowledge and skills that will help them build a brighter future for themselves 
        and their communities.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>

      <ul className="list-disc pl-5 mb-6">
        <li>Identify children in need through partnerships and community outreach.</li>
        <li>Provide necessary resources like school supplies, uniforms, and tuition fees.</li>
        <li>Monitor and track the progress of each child to ensure they are thriving academically.</li>
        <li>Offer additional support through tutoring, mentorship, and extracurricular activities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>

      <p>
        Your support can make a significant difference in the lives of these children. 
        Whether it's through donations, volunteering, or spreading the word about our cause, every contribution counts.
      </p>
      
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Sign Up
      </button>
    </div>
  );
}
