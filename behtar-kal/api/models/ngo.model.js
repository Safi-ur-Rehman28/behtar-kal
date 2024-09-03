import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  uniqueId: { type: String, required: true },
  cnicUrl: { type: String },
  profilePicture: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
  },
});

const Ngo = mongoose.model('Ngo', ngoSchema);
export default Ngo;
