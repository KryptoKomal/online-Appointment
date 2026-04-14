import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppointment } from '../context/AppointmentContext';
import { Card, Badge } from '../components/UI';
import DashboardLayout from '../layouts/DashboardLayout';
import { format } from 'date-fns';
import { Calendar, Clock, DollarSign, FileText } from 'lucide-react';

const History = () => {
  const { appointments, getAppointments, loading } = useAppointment();

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment History</h1>
          <p className="text-gray-500">View all your past and upcoming appointments.</p>
        </div>

        <Card className="overflow-hidden border-none shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Service</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date & Time</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="5" className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-lg w-full" /></td>
                    </tr>
                  ))
                ) : appointments.length > 0 ? (
                  appointments.map((app) => (
                    <motion.tr 
                      key={app._id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{app.slot?.serviceName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{format(new Date(app.slot?.date), 'PP')}</span>
                          <span className="text-xs text-gray-500">{app.slot?.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">${app.slot?.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={app.status}>{app.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500 truncate max-w-[150px] block">
                          {app.note || 'No notes'}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;
