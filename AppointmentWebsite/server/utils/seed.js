require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Slot = require('../models/Slot');
const Appointment = require('../models/Appointment');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Slot.deleteMany();
    await Appointment.deleteMany();

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    });

    // Create User
    const user = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Users created!');

    // Create Slots
    const today = new Date();
    const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
    const services = ['General Consultation', 'Skin Checkup', 'Dental Care', 'Physical Therapy'];

    const slots = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      times.forEach((time, index) => {
        slots.push({
          date,
          time,
          serviceName: services[index % services.length],
          price: 50 + (index * 10),
          status: 'available'
        });
      });
    }

    await Slot.insertMany(slots);
    console.log('Slots created!');

    console.log('Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
