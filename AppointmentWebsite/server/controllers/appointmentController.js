const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
  const { slotId, note } = req.body;

  const slot = await Slot.findById(slotId);

  if (!slot) {
    return res.status(404).json({ message: 'Slot not found' });
  }

  if (slot.status === 'booked') {
    return res.status(400).json({ message: 'Slot is already booked' });
  }

  const appointment = await Appointment.create({
    user: req.user._id,
    slot: slotId,
    note,
  });

  if (appointment) {
    // Mark slot as booked
    slot.status = 'booked';
    await slot.save();

    res.status(201).json(appointment);
  } else {
    res.status(400).json({ message: 'Invalid appointment data' });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('slot')
    .sort({ createdAt: -1 });

  res.json(appointments);
};

// @desc    Get all appointments (Admin only)
// @route   GET /api/appointments/admin
// @access  Private/Admin
const getAllAppointmentsAdmin = async (req, res) => {
  const appointments = await Appointment.find({})
    .populate('user', 'name email avatar')
    .populate('slot')
    .sort({ createdAt: -1 });

  res.json(appointments);
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointmentStatus = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    // User can only cancel their own appointment if it's not already completed
    if (req.user.role === 'user' && appointment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { status } = req.body;
    appointment.status = status || appointment.status;

    // If cancelled, free up the slot
    if (status === 'cancelled') {
      const slot = await Slot.findById(appointment.slot);
      if (slot) {
        slot.status = 'available';
        await slot.save();
      }
    }

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    // If not already cancelled, free up the slot
    if (appointment.status !== 'cancelled') {
      const slot = await Slot.findById(appointment.slot);
      if (slot) {
        slot.status = 'available';
        await slot.save();
      }
    }

    await Appointment.deleteOne({ _id: req.params.id });
    res.json({ message: 'Appointment removed' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
};

module.exports = {
  bookAppointment,
  getUserAppointments,
  getAllAppointmentsAdmin,
  updateAppointmentStatus,
  deleteAppointment,
};
