import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppointment } from '../context/AppointmentContext';
import { Button, Card, Badge } from '../components/UI';
import DashboardLayout from '../layouts/DashboardLayout';
import { format } from 'date-fns';

const UserDashboard = () => {
  const { user } = useAuth();
  const { appointments, getAppointments, loading, cancelAppointment } = useAppointment();

  useEffect(() => {
    getAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(app => 
    app.status === 'confirmed' || app.status === 'pending'
  );

  const stats = [
    { label: 'Total Bookings', value: appointments.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Cancelled', value: appointments.filter(a => a.status === 'cancelled').length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500">Here's what's happening with your appointments.</p>
          </div>
          <Link to="/book">
            <Button className="space-x-2">
              <Plus size={18} />
              <span>Book New</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="flex items-center space-x-4 p-5">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
            <Link to="/history" className="text-sm text-primary font-medium hover:underline flex items-center space-x-1">
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => <div key={i} className="h-32 shimmer rounded-2xl" />)}
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingAppointments.map((app) => (
                <motion.div
                  key={app._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-5 border-l-4 border-l-primary hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{app.slot?.serviceName}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1" />
                          <span>{format(new Date(app.slot?.date), 'PPP')}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock size={14} className="mr-1" />
                          <span>{app.slot?.time}</span>
                        </div>
                      </div>
                      <Badge status={app.status}>{app.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-sm font-bold text-gray-900">${app.slot?.price}</span>
                      {app.status !== 'cancelled' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 p-0"
                          onClick={() => cancelAppointment(app._id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center space-y-4">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Calendar size={40} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">No upcoming appointments</p>
                <p className="text-gray-500">You haven't booked any appointments yet.</p>
              </div>
              <Link to="/book">
                <Button>Book Your First Appointment</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
