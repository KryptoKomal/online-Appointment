# 📅 BookEase - Professional Online Appointment Booking System

BookEase is a high-fidelity, full-stack appointment management system built using the MERN stack. It features a modern, responsive UI with multi-theme support (Modern, Neubrutalism, Neumorphism) and robust functionality for both users and administrators.

## ✨ Key Features

### 👤 User Features
- **Secure Authentication**: JWT-based login and registration with encrypted passwords.
- **Dynamic Booking**: Browse available slots and book appointments in seconds.
- **Multi-Theme UI**: Switch between Modern, Neubrutalism, and Neumorphism design languages.
- **Appointment Management**: View history and cancel upcoming appointments.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.

### 🛡️ Admin Features
- **Analytics Dashboard**: Real-time insights into bookings, users, and trends using Recharts.
- **Slot Management**: Create, update, and delete appointment slots.
- **Booking Oversight**: Approve, reject, or track the status of all user appointments.
- **Call Analytics**: A specialized futuristic dark-themed dashboard for communication metrics.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS (v4), Framer Motion, Lucide React, Recharts.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Security**: JWT (JSON Web Tokens), Bcrypt.js.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed on your machine.
- MongoDB running locally or a MongoDB Atlas URI.

### Step 1: Clone the repository
```bash
git clone https://github.com/anandaditya2718-lgtm/AppointmentWebsite.git
cd AppointmentWebsite
```

### Step 2: Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/appointment-booking
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```
4. Seed the database with initial test data:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Step 3: Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `password123` |
| **User** | `user@example.com` | `password123` |

## 🎨 Theme Switcher
Access the **Palette 🎨** icon in the Navbar to toggle between:
- **Modern**: Sleek SaaS aesthetic.
- **Neubrutalism**: High-contrast, bold borders.
- **Neumorphism**: Soft, 3D tactile UI.

---
Built with ❤️ by your AI Pair Programmer.
