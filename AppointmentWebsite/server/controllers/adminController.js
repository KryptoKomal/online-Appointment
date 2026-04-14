const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Slot = require('../models/Slot');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalBookings = await Appointment.countDocuments();
    const pendingBookings = await Appointment.countDocuments({ status: 'pending' });
    const confirmedBookings = await Appointment.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Appointment.countDocuments({ status: 'cancelled' });
    const completedBookings = await Appointment.countDocuments({ status: 'completed' });

    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalSlots = await Slot.countDocuments();
    const availableSlots = await Slot.countDocuments({ status: 'available' });

    // Last 6 months booking stats for chart
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalUsers,
      totalSlots,
      availableSlots,
      monthlyStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
