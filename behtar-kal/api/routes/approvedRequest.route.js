// routes/approvedRequests.js

import express from 'express';
import StationaryRequest from '../models/stationaryRequest.model.js';

const router = express.Router();

// Route to fetch approved requests
router.get('/', async (req, res) => {
  try {
    // Query the database for requests with status "Approved"
    const approvedRequests = await StationaryRequest.find({ status: 'Approved' });

    // Return the approved requests as JSON
    res.json({ success: true, data: approvedRequests });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching approved requests:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
