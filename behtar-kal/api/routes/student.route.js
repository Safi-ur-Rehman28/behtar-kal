import express from 'express';
import Student from '../models/student.model.js';

const router = express.Router();

// Get all students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
});

// Add a new student
router.post('/', async (req, res, next) => {
  try {
    const { username, email, location, contact, uniqueId, description, financialExpenses, scholarshipRequested, school, numItemsAvailed, donationAmount } = req.body;
    
    const student = new Student({
      username,
      email,
      location,
      contact,
      uniqueId,
      description,
      financialExpenses,
      scholarshipRequested,
      school,
      numItemsAvailed,
      donationAmount
    });

    await student.save();

    res.status(201).json({ success: true, message: 'Student added successfully', data: student });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, message: 'Failed to add student', error: error.message });
  }
});

// Update a student
router.put('/:id', async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    next(error);
  }
});

// Delete a student
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: deletedStudent });
  } catch (error) {
    next(error);
  }
});

export default router;
