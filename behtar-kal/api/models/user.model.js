import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    parentname: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    cnic: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    },
    location: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['ngo', 'stakeholder', 'user','parent'],
        required: [true,"please provide your role "]
    },
    // NGO-specific fields
    name: { // NGO name
        type: String,
        required: false, // Optional for NGOs
    },
    uniqueId: { // NGO unique ID
        type: String,
        required: false, // Optional for NGOs
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isNGO:{
        type:Boolean,
        default:false,
    },
    isStakeholder:{
        type:Boolean,
        default:false,
    },
    isUser:{
        type:Boolean,
        default:false,
    },
    isParent:{
        type:Boolean,
        default:false,
    },
  document: {
    type: String, // We'll store the file path or URL here
  },
    stationaryRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StationaryRequest',
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
