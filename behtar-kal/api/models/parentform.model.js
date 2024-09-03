// models/ParentForm.js

import mongoose from 'mongoose';

const parentFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  requestFor: { type: String, required: true },
  cnicBForm: { type: String, required: true },
  description:{ type: String, required: true},

  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const ParentForm = mongoose.model('ParentForm', parentFormSchema);

export default ParentForm;
