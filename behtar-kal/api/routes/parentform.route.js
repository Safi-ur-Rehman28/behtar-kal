// routes/parentForm.js

import express from 'express';
import ParentForm from '../models/parentform.model.js';

const router = express.Router();

// POST request to handle form submission
router.post('/', async (req, res) => {
  try {
    // Create a new ParentForm instance with data from the request body
    const parentForm = new ParentForm(req.body);

    // Save the form data to the database
    await parentForm.save();

    // Send a success response
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    // Send an error response if there's an error
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
});


router.get('/latest', async (req, res) => {
    try {
      // Find the latest form submission in the database
      const latestRequest = await ParentForm.findOne().sort({ createdAt: -1 });
  
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

  // Route to fetch parent/guardian forms data
router.get('/parent', async (req, res) => {
  try {
    // Fetch all parent/guardian forms data from the database
    const parentForms = await ParentForm.find();
    res.json({ success: true, data: parentForms });
  } catch (error) {
    console.error('Error fetching parent forms:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
export default router;
