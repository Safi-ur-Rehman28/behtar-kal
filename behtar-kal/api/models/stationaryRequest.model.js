import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  requestFor: { type: String, required: true },
  cnicBForm: { type: String, required: true },
  status: { type: String, default: 'pending' },
  description: { type: String, required: true },
  approvedBy: { type: String, required: false }, // Added approvedBy field
}, 
{ timestamps: true });

const RequestSchema = mongoose.model('Request', requestSchema);

export default RequestSchema;
