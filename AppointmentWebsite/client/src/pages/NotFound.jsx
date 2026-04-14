import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/UI';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary"
        >
          <Calendar size={64} />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-gray-900">404</h1>
          <h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Oops! The appointment you're looking for doesn't exist or has been moved. 
            Let's get you back on schedule.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button className="space-x-2">
              <Home size={18} />
              <span>Back to Home</span>
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline" className="space-x-2">
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </Button>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
