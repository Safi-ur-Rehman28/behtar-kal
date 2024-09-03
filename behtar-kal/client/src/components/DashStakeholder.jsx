import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup, HiArrowNarrowUp } from 'react-icons/hi';
import { FaDonate, FaTasks, FaWhatsapp } from 'react-icons/fa'; // Import FaWhatsapp icon
import { Button, Table, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';

export default function DashStakeholder() {
  const { currentUser } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchProjects();
        await fetchDonations();
        await fetchStudents();
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/donations');
      if (!res.ok) {
        throw new Error('Failed to fetch donations');
      }
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex flex-wrap gap-4 justify-center'>
        {/* Ongoing Projects Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Ongoing Projects</h3>
              <p className='text-2xl'>{projects.length}</p>
            </div>
            <FaTasks className='bg-blue-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </Card>
        {/* Total Donations Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Donations</h3>
              <p className='text-2xl'>{donations.reduce((acc, donation) => acc + donation.amount, 0)}</p>
            </div>
            <FaDonate className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              <span>Recent: {donations.length > 0 ? donations[0].amount : 0}</span>
            </span>
          </div>
        </Card>
        {/* Total Students Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Students</h3>
              <p className='text-2xl'>{students.length}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </Card>
        {/* WhatsApp Card */}
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <h3 className='text-gray-500 text-md uppercase'>Chat on WhatsApp</h3>
          <Button gradientDuoTone='greenToBlue'>
            <a href='https://wa.me/1234567890' target='_blank' rel='noopener noreferrer' className='flex items-center'>
              <FaWhatsapp className='w-5 h-5 mr-2' /> {/* WhatsApp icon */}
              WhatsApp
            </a>
          </Button>
        </Card>
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
      </div>

      <div className='flex flex-wrap gap-4 py-3 justify-center'>
        {/* Ongoing Projects Table */}
        <div className='flex flex-col w-full md:w-1/2 shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Ongoing Projects</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=projects'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Project Name</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Deadline</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {Array.isArray(projects) &&
                projects.map((project) => (
                  <Table.Row key={project._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{project.name}</Table.Cell>
                    <Table.Cell>{project.status}</Table.Cell>
                    <Table.Cell>{new Date(project.deadline).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Button size='xs' gradientDuoTone='greenToBlue'>
                        <Link to={`/project/${project._id}`}>View</Link>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* Recent Donations Table */}
        <div className='flex flex-col w-full md:w-1/2 shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Donations</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=donations'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Donor Name</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {Array.isArray(donations) &&
                donations.map((donation) => (
                  <Table.Row key={donation._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{donation.donorName}</Table.Cell>
                    <Table.Cell>{donation.amount}</Table.Cell>
                    <Table.Cell>{new Date(donation.date).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Button size='xs' gradientDuoTone='greenToBlue'>
                        <Link to={`/donation/${donation._id}`}>View</Link>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        
      </div>
      <h3>Give a moment to and give feedback</h3>
      <FeedbackForm/>
    </div>
  );
}
