import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import authRoutes from './routes/auth.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
import { EventEmitter } from 'events';
import NgoRoutes from './routes/ngo.route.js';
import StakeholderRoute from './routes/stakeholder.route.js';
import ParentRoute from './routes/parent.route.js';
import multer from 'multer'; // Import multer for handling file uploads
import StationaryRequest from './models/stationaryRequest.model.js';
import Stakeholder from './models/stakeholder.model.js'
import Ngo from './models/ngo.model.js';
import studentRoutes from './routes/student.route.js';
import cors from 'cors'; 
import apiRoutes from './routes/api.route.js'
dotenv.config();
import Project from './models/project.model.js';
import Donation from './models/donation.model.js';
import parentFormRoutes from './routes/parentform.route.js';
import Student from './models/student.model.js';
import requestRoutes from './routes/request.route.js';
import FeedbackModel from './models/feedback.model.js'
import approvedRequestsRouter from './routes/approvedRequest.route.js';
mongoose.connect(process.env.MONGO)
.then(()=>
{
    console.log('mongodb is connected hello');
}).catch (err =>{
    console.log(err);
});



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.listen(3000 , ()=>{
    console.log('server is running in port 3000@@');
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/ngo', NgoRoutes);
app.use('/api/stakeholder', StakeholderRoute);
app.use('/api/parent', ParentRoute);
app.use('/api/students', studentRoutes); // Add
app.use('/api', apiRoutes);
app.use('/api/parent', parentFormRoutes);// Use parentForm route
app.use('/api/request', requestRoutes);
app.use('/api', parentFormRoutes);
app.use('/api/approved-requests', approvedRequestsRouter);


app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.post('/api/submit-form', async (req, res) => {
  const {userId, name, fatherName, address, phone, requestFor, description,cnicBForm } = req.body;

  try {
    const newRequest = new StationaryRequest({
      userId,
      name,
      fatherName,
      address,
      phone,
      requestFor,
      description, 
      cnicBForm,
    });

    await newRequest.save();
    res.status(201).json({ success: true, message: 'Form data saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save form data', errors: error });
  }
});

app.get('/api/requests', async (req, res) => {
  try {
    console.log('Fetching requests...');
    const requests = await StationaryRequest.find();
    console.log('Requests:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Modify the backend code to ensure the '/api/user/requests' endpoint returns the requested items and their status
app.get('/api/user/request', async (req, res) => {
  try {
    // Assuming you have a model named 'Request' to represent user requests
    const requests = await Request.find({}); // Fetch all requests from the database
    res.json({ data: requests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});

app.get('/api/parent-forms', async (req, res) => {
  try {
    const parentForms = await parentFormRoutes.find();
    res.json(parentForms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/request/:id/approve', async (req, res) => {
  try {
    const request = await StationaryRequest.findById(req.params.id);
    if (request) {
      request.status = 'Approved';
      await request.save();
      res.json({ success: true, message: 'Request approved', data: request });
    } else {
      res.status(404).json({ success: false, message: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to approve request', errors: error });
  }
});

app.post('/api/request/:id/reject', async (req, res) => {
  try {
    const request = await StationaryRequest.findById(req.params.id);
    if (request) {
      request.status = 'Rejected';
      await request.save();
      res.json({ success: true, message: 'Request rejected', data: request });
    } else {
      res.status(404).json({ success: false, message: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reject request', errors: error });
  }
});

//ngo fetch 
app.get('/api/ngos', async (req, res) => {
  try {
    const ngos = await Ngo.find({});
    res.json({ data: ngos });
  } catch (error) {
    console.error('Error fetching NGO data:', error);
    res.status(500).json({ message: 'Failed to fetch NGO data' });
  }
});

//fetch stakholder
app.get('/api/stakeholders', async (req, res) => {
  try {
    const stakeholders = await Stakeholder.find({});
    res.json({ data: stakeholders });
  } catch (error) {
    console.error('Error fetching Stakeholder data:', error);
    res.status(500).json({ message: 'Failed to fetch Stakeholder data' });
  }
});

// Define routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ data: students });
  } catch (error) {
    console.error('Failed to fetch students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = req.body;
    const student = new Student(newStudent);
    await student.save();
    res.status(201).json({ message: 'Student added successfully', data: student });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Failed to add student', error: error.message });
  }
});
// Update a student
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, message: 'Student updated successfully', data: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Failed to update student' });
  }
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, message: 'Failed to delete student' });
  }
});
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});


// Define route handler for GET /api/donations
app.get('/api/donations', async (req, res) => {
  try {
    // Fetch donations data from the database using Mongoose
    const donations = await Donation.find();

    // Send the donations data as JSON response
    res.json(donations);
  } catch (error) {
    // Handle errors
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//for getting 
// Route to handle feedback submission
app.post('/api/feedback', async (req, res) => {
  try {
    // Create a new feedback document using the FeedbackModel
    const newFeedback = new FeedbackModel(req.body);

    // Save the feedback document to MongoDB
    await newFeedback.save();

    // Send a success response
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Define route to fetch feedback data
app.get('/api/feedback', async (req, res) => {
  try {
    // Fetch all feedback data from the database
    const feedbackData = await FeedbackModel.find();
    res.json(feedbackData); // Send the feedback data as JSON response
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Internal server error' }); // Send error response
  }
});

// Define route to fetch only approved status request data
// Define route to fetch only approved status request data
app.get('/api/approved-requests', async (req, res) => {
  try {
    const approvedRequests = await RequestSchema.find({ status: 'approved' });
    res.json(approvedRequests);
  } catch (error) {
    console.error('Error fetching approved requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
