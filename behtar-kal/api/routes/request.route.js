// requestRoutes.js
import express from 'express';
const router = express.Router();
import Request from '../models/stationaryRequest.model.js'; // Assuming you have a Request model

// Route to approve a request
router.post('/:id/approve', async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Request.findByIdAndUpdate(requestId, { status: 'Approved' }, { new: true });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.status(200).json({ message: 'Request approved successfully', request });
  } catch (error) {
    console.error('Error approving request:', error);
    return res.status(500).json({ message: 'Failed to approve request' });
  }
});

// Route to reject a request
router.post('/:id/reject', async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Request.findByIdAndUpdate(requestId, { status: 'Rejected' }, { new: true });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.status(200).json({ message: 'Request rejected successfully', request });
  } catch (error) {
    console.error('Error rejecting request:', error);
    return res.status(500).json({ message: 'Failed to reject request' });
  }
});

// Route to fetch approval requests
router.get('//api/requests/${id}', async (req, res) => {
    try {
      // Fetch approval requests from the database
      const approvalRequests = await Request.find();
      res.json({ data: approvalRequests });
    } catch (error) {
      console.error("Error fetching approval requests: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  

export default router;
