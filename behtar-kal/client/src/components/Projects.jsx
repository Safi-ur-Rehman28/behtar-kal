import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

function Projects() {
  const [data, setData] = useState([]);
  const location = useLocation(); // Use the useLocation hook

  // Define fetchData outside of useEffect but within the component function
  const fetchData = async () => {
    const queryParams = new URLSearchParams(location.search); // Now location is defined
    const tab = queryParams.get('tab');

    switch (tab) {
      case 'projects':
        // Fetch projects including student details
        const projectResponse = await fetch('/api/projects'); // Ensure this endpoint returns the expected data structure
        const projects = await projectResponse.json();
        setData(projects);
        break;
      case 'donations':
        // Placeholder for donations, adjust as needed
        const donationResponse = await fetch('/api/donations');
        const donations = await donationResponse.json();
        setData(donations);
        break;
      default:
        console.log("No matching tab found");
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]); // Depend on location.search

  const handleDelete = async (projectId) => {
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      // Refresh the data after successful deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-semibold mb-4 mt-8 text-center'>Stakeholder Projects</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {data.map(project => (
          <div key={project._id} className='max-w-md mx-auto rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 my-4 w-full'>
            <div className='px-6 py-4'>
              <div className='flex flex-col'>
                <h2 className='font-bold text-2xl mb-2'>{project.name}</h2>
                <div className='mt-2'>
                  <ul>
                    {project.students.map((student, index) => (
                      <li key={`${project._id}-${index}`} className='flex items-center space-x-2 mb-2'>
                        <img src="https://via.placeholder.com/40" alt="Student Avatar" className='w-10 h-10 rounded-full' /> {/* Placeholder avatar */}
                        <span className='font-medium'>Student name: {student.name} - Progress: {student.progress}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className='text-gray-700 text-lg mt-2'>{project.description}</p>
              </div>
            </div>
            <div className='px-6 pt-4 pb-2 flex justify-between items-center'>
              <span className='inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{project.status}</span>
              <button onClick={() => handleDelete(project._id)} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
