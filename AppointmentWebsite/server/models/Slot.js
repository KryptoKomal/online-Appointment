const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  time: {
    type: String,
    required: [true, 'Please add a time'],
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0,
  },
  serviceName: {
    type: String,
    required: [true, 'Please add a service name'],
    default: 'General Consultation',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Slot', slotSchema);
