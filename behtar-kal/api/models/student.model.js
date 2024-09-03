import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  uniqueId: { type: String, required: true },
  cnicUrl: { type: String },
  profilePicture: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
  },
  description: { type: String },
  financialExpenses: { type: Number }, // Add financial expenses field
  scholarshipRequested: { type: Boolean }, // Add scholarship requested field
  school: { type: String }, // Add school field
  numItemsAvailed: { type: Number }, // Add number of items availed field
  donationAmount: { type: Number } // Add donation amount field
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
