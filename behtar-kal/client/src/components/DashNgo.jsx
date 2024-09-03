import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup, HiArrowNarrowUp } from 'react-icons/hi';
import { FaDonate, FaWhatsapp } from "react-icons/fa";
import { Button, Table, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';

export default function DashboardNgo() {
  const { currentUser } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const isAdminOrAuthorized = ['admin', 'ngo', 'stakeholder'].includes(currentUser.role);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (isAdminOrAuthorized) {
        await fetchStudents();
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentUser, isAdminOrAuthorized]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const res = await fetch('/api/students/getstudents', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setStudents(data);
      } else {
        console.log('Error:', data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='p-3 md:mx-auto'>
     
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Students</h3>
              <p className='text-2xl'>{students.length}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total donation</h3>
              <p className='text-2xl'>total donation</p>
            </div>
            <FaDonate className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              <span>RS: 500000</span>
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 justify-center'>
        {/* Google Meet Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Schedule a Meeting</h3>
          <Button gradientDuoTone='greenToBlue'>
            <a href='https://meet.google.com/' target='_blank' rel='noopener noreferrer' className='flex items-center'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Google_Meet_icon_%282020%29.svg/1024px-Google_Meet_icon_%282020%29.svg.png'
                alt='Google Meet'
                className='w-5 h-5 mr-2'
              />
              Google Meet
            </a>
          </Button>
        </Card>
        {/* Gmail Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Communicate with Admin</h3>
          <Button gradientDuoTone='purpleToPink'>
            <a href='https://mail.google.com/' target='_blank' rel='noopener noreferrer' className='flex items-center'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Gmail_Icon.png/1024px-Gmail_Icon.png'
                alt='Gmail'
                className='w-5 h-5 mr-2'
              />
              Gmail
            </a>
          </Button>
        </Card>
        {/* WhatsApp Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Chat on WhatsApp</h3>
          <Button gradientDuoTone='greenToBlue'>
            <a href='https://wa.me/1234567890' target='_blank' rel='noopener noreferrer' className='flex items-center'>
              <FaWhatsapp className='w-5 h-5 mr-2' />
              WhatsApp
            </a>
          </Button>
        </Card>
      </div>
      <h3>Give a moment to and give feedback</h3>
      <FeedbackForm/>
    </div>
  );
}
