// routes/studentForm.js
import express from 'express';
import StudentForm from '../models/studentform.model.js';

const router = express.Router();

// POST request to handle student form submission
router.post('/', async (req, res) => {
  try {
    // Create a new StudentForm instance with data from the request body
    const studentForm = new StudentForm(req.body);

    // Save the form data to the database
    await studentForm.save();

    // Send a success response
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    // Send an error response if there's an error
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
});

// GET request to fetch the latest student form submission
router.get('/latest', async (req, res) => {
  try {
    // Find the latest form submission in the database
    const latestRequest = await StudentForm.findOne().sort({ createdAt: -1 });

    if (!latestRequest) {
      return res.status(404).json({ message: 'No requests found' });
    }

    // Send the latest form submission data as the response
    res.json(latestRequest);
  } catch (error) {
    // Send an error response if there's an error
    console.error('Error fetching latest request:', error);
    res.status(500).json({ message: 'Failed to fetch latest request' });
  }
});

export default router;
