const mongoose = require('mongoose');

const BoothRequestSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expo', required: true },
  eventTitle: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'exhibitors', required: true },
  userName: { type: String, required: true },
  boothNumber: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now }
});

const BoothRequests = mongoose.model('BoothRequest', BoothRequestSchema);
module.exports = BoothRequests