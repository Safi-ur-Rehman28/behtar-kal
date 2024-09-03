import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, TextInput, Label } from 'flowbite-react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function StakeUserPro() {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', status: '', deadline: '', students: [] });
  const [donationForm, setDonationForm] = useState({ donorName: '', amount: '', date: '', description: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [editingDonation, setEditingDonation] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchDonations();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data); // Assuming data is an array of projects
      } else {
        console.error('Failed to fetch projects:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations');
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      } else {
        console.error('Failed to fetch donations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      });
      if (response.ok) {
        const data = await response.json();
        setProjects([...projects, data]);
        setShowProjectModal(false);
        setProjectForm({ name: '', description: '', status: '', deadline: '', students: [] });
      } else {
        console.error('Failed to add project:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDonation) {
        // Handle update logic
      } else {
        const response = await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(donationForm)
        });
        if (response.ok) {
          const data = await response.json();
          setDonations([...donations, data]);
          setShowDonationModal(false);
          setDonationForm({ donorName: '', amount: '', date: '', description: '' });
        } else {
          console.error('Failed to add donation:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error adding/editing donation:', error);
    }
  };

  const handleEditProject = (project) => {
    // Assuming you have a form or modal for editing projects,
    // you can populate the form fields with the project data
    // and set the state to indicate that you are in edit mode.
    setProjectForm({
      name: project.name,
      description: project.description,
      status: project.status,
      deadline: project.deadline,
      // You may need to set other fields depending on your form structure
    });
    setEditingProject(project);
    setShowProjectModal(true); // Show the modal or form for editing
  };
  
  const handleDeleteProject = async (id) => {
    try {
      // Send a DELETE request to your backend API to delete the project with the given ID
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If the deletion is successful, update the projects state by removing the deleted project
        setProjects(projects.filter(project => project._id !== id));
      } else {
        console.error('Failed to delete project:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  

  const handleEditDonation = (donation) => {
    setDonationForm(donation);
    setEditingDonation(donation);
    setShowDonationModal(true);
  };

  const handleDeleteDonation = async (id) => {
    try {
      await fetch(`/api/donations/${id}`, { method: 'DELETE' });
      setDonations(donations.filter(donation => donation._id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Ongoing Projects</h3>
              <p className='text-2xl'>{projects.length}</p>
            </div>
            <FaPlus className='cursor-pointer text-blue-600' onClick={() => setShowProjectModal(true)} />
          </div>
        </Card>
        <Card className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Donations</h3>
              <p className='text-2xl'>{donations.reduce((acc, donation) => acc + donation.amount, 0)}</p>
            </div>
            <FaPlus className='cursor-pointer text-indigo-600' onClick={() => setShowDonationModal(true)} />
          </div>
        </Card>
      </div>
      <div className='flex flex-wrap gap-4 py-3 justify-center'>
        <div className='flex flex-col w-full md:w-1/2 shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Ongoing Projects</h1>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Project Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Deadline</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {Array.isArray(projects) && projects.map((project) => (
                <Table.Row key={project._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{project.description}</Table.Cell>
                  <Table.Cell>{project.status}</Table.Cell>
                  <Table.Cell>{new Date(project.deadline).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='flex space-x-2'>
                    <FaEdit className='cursor-pointer text-green-600' onClick={() => handleEditProject(project)} />
                    <FaTrash className='cursor-pointer text-red-600' onClick={() => handleDeleteProject(project._id)} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-1/2 shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Donations</h1>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Donor Name</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {Array.isArray(donations) && donations.map((donation) => (
                <Table.Row key={donation._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{donation.donorName}</Table.Cell>
                  <Table.Cell>{donation.amount}</Table.Cell>
                  <Table.Cell>{new Date(donation.date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{donation.description}</Table.Cell>
                  <Table.Cell className='flex space-x-2'>
                    <FaEdit className='cursor-pointer text-green-600' onClick={() => handleEditDonation(donation)} />
                    <FaTrash className='cursor-pointer text-red-600' onClick={() => handleDeleteDonation(donation._id)} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>

      <Modal show={showProjectModal} onClose={() => setShowProjectModal(false)}>
        <Modal.Header>{editingProject ? 'Edit Project' : 'Add Project'}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleProjectSubmit}>
            <div className='mb-2 block'>
              <Label htmlFor='name' value='Project Name' />
              <TextInput id='name' type='text' placeholder='Project Name' required value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} />
            </div>
            <div className='mb-2 block'>
              <Label htmlFor='description' value='Description' />
              <TextInput id='description' type='text' placeholder='Description' required value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
            </div>
            <div className='mb-2 block'>
              <Label htmlFor='status' value='Status' />
              <TextInput id='status' type='text' placeholder='Status' required value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })} />
            </div>
            <div className='mb-2 block'>
              <Label htmlFor='deadline' value='Deadline' />
              <TextInput id='deadline' type='date' required value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDonationModal} onClose={() => setShowDonationModal(false)}>
        <Modal.Header>{editingDonation ? 'Edit Donation' : 'Add Donation'}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleDonationSubmit}>
            <div className='mb-2 block'>
              <Label htmlFor='donorName' value='Donor Name' />
              <TextInput id='donorName' type='text' placeholder='Donor Name' required value={donationForm.donorName} onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })} />
            </div>
            <div className='mb-2 block'>
              <Label htmlFor='amount' value='Amount' />
              <TextInput id='amount' type='number' placeholder='Amount' required value={donationForm.amount} onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })} />
            </div>
            <div className='mb-2 block'>
              <Label htmlFor='date' value='Date' />
              <TextInput id='date' type='date' required value={donationForm.date} onChange={(e) => setDonationForm({ ...donationForm, date: e.target.value })} />
            </div>
            <div className='mb-2 block'>
              <Label htmlFor='description' value='Description' />
              <TextInput id='description' type='text' placeholder='Description' required value={donationForm.description} onChange={(e) => setDonationForm({ ...donationForm, description: e.target.value })} />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
