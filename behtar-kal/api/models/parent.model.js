import mongoose from "mongoose";
const ParentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  documentUrl: { type: String },
  cnicUrl: { type: String },
  profilePicture: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
},

});
const Parent = mongoose.model('Parent',ParentSchema);
export default Parent;