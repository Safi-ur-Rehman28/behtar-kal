import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  
  const { 
    username, 
    email, 
    password, 
    contact, 
    location, 
    parentname,
    cnic,
    role, // Added role
    name, // Added for NGO
    uniqueId, // Added for NGO
  } = req.body;

  

  if (!username || !email || !password || !cnic) {
    return next(errorHandler(400, 'Required fields are missing'));
 }

 // Validate student details if role is 'student'
 if (role === 'student' && (!parentname || !contact || !location)) {
    return next(errorHandler(400, 'Student details are required'));
 }

 // Validate NGO details if role is 'NGO'
 if (role === 'NGO' && (!name || !uniqueId)) {
    return next(errorHandler(400, 'NGO details are required'));
 }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    contact,
    location,
    parentname: role === 'student' ? parentname : undefined, // Only include if role is student
    cnic,
    isNGO: role === 'NGO', // Set isNGO based on role
    isStudent: role === 'student', // Set isStudent based on role
    name: role === 'NGO' ? name : undefined, // Only include if role is NGO
    uniqueId: role === 'NGO' ? uniqueId : undefined, // Only include if role is NGO
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        isNGO: role === 'NGO',
        isStudent: role === 'student',
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
