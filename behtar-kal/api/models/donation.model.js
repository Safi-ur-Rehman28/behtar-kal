import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  records: [{
    description: { type: String, required: true },
    progress: { type: String, required: true }
  }]
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
