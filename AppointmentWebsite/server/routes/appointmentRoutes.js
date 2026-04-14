const express = require('express');
const router = express.Router();
const { bookAppointment, getUserAppointments, getAllAppointmentsAdmin, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getUserAppointments)
  .post(protect, bookAppointment);

router.get('/admin', protect, admin, getAllAppointmentsAdmin);

router.route('/:id')
  .put(protect, updateAppointmentStatus)
  .delete(protect, admin, deleteAppointment);

module.exports = router;
