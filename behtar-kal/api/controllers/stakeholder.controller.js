import Stakeholder from '../models/stakeholder.model.js';
import bcryptjs from 'bcryptjs';


export const signup = async (req, res, next) => {
  const { username, email, location, password, contact, cnic } = req.body;
  
  try {
    const existingUser = await NGO.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Stakeholder({
      username,
      email,
      location,
      password: hashedPassword,
      contact,
      cnic
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'stakeholders  registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
