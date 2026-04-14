const Slot = require('../models/Slot');

// @desc    Get all available slots
// @route   GET /api/slots
// @access  Public
const getSlots = async (req, res) => {
  const slots = await Slot.find({ status: 'available' }).sort({ date: 1, time: 1 });
  res.json(slots);
};

// @desc    Get all slots (Admin only)
// @route   GET /api/slots/admin
// @access  Private/Admin
const getAllSlotsAdmin = async (req, res) => {
  const slots = await Slot.find({}).sort({ date: -1, time: 1 });
  res.json(slots);
};

// @desc    Create a slot
// @route   POST /api/slots
// @access  Private/Admin
const createSlot = async (req, res) => {
  const { date, time, price, serviceName } = req.body;

  const slotExists = await Slot.findOne({ date, time });

  if (slotExists) {
    return res.status(400).json({ message: 'Slot already exists for this time' });
  }

  const slot = await Slot.create({
    date,
    time,
    price,
    serviceName,
  });

  if (slot) {
    res.status(201).json(slot);
  } else {
    res.status(400).json({ message: 'Invalid slot data' });
  }
};

// @desc    Update a slot
// @route   PUT /api/slots/:id
// @access  Private/Admin
const updateSlot = async (req, res) => {
  const slot = await Slot.findById(req.params.id);

  if (slot) {
    slot.date = req.body.date || slot.date;
    slot.time = req.body.time || slot.time;
    slot.price = req.body.price || slot.price;
    slot.serviceName = req.body.serviceName || slot.serviceName;
    slot.status = req.body.status || slot.status;

    const updatedSlot = await slot.save();
    res.json(updatedSlot);
  } else {
    res.status(404).json({ message: 'Slot not found' });
  }
};

// @desc    Delete a slot
// @route   DELETE /api/slots/:id
// @access  Private/Admin
const deleteSlot = async (req, res) => {
  const slot = await Slot.findById(req.params.id);

  if (slot) {
    await Slot.deleteOne({ _id: req.params.id });
    res.json({ message: 'Slot removed' });
  } else {
    res.status(404).json({ message: 'Slot not found' });
  }
};

module.exports = {
  getSlots,
  getAllSlotsAdmin,
  createSlot,
  updateSlot,
  deleteSlot,
};
