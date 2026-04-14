import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CallDashboard from './pages/CallDashboard';
import Booking from './pages/Booking';
import ManageSlots from './pages/ManageSlots';
import History from './pages/History';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden bg-white">
        {/* Mesh Background */}
        <div className="fixed inset-0 -z-10 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh" />
        </div>

        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/analytics" element={<PageTransition><CallDashboard /></PageTransition>} />

            {/* User Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <PageTransition><UserDashboard /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/book" element={
              <ProtectedRoute>
                <PageTransition><Booking /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <PageTransition><History /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <PageTransition><Profile /></PageTransition>
              </ProtectedRoute>
            } />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute isAdmin={true}>
                <PageTransition><AdminDashboard /></PageTransition>
              </ProtectedRoute>
            } />
            <Route path="/admin/slots" element={
              <ProtectedRoute isAdmin={true}>
                <PageTransition><ManageSlots /></PageTransition>
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
