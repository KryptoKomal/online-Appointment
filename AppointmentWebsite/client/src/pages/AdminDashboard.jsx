import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Card, Badge, Button } from '../components/UI';
import DashboardLayout from '../layouts/DashboardLayout';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [statsRes, appRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats', config),
          axios.get('http://localhost:5000/api/appointments/admin', config)
        ]);
        setStats(statsRes.data);
        setAppointments(appRes.data);
      } catch (error) {
        console.error('Error fetching admin data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.token]);

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status }, config);
      // Refresh list
      const appRes = await axios.get('http://localhost:5000/api/appointments/admin', config);
      setAppointments(appRes.data);
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Confirmed', value: stats?.confirmedBookings || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Cancelled', value: stats?.cancelledBookings || 0, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
            <p className="text-gray-500">Real-time analytics and management.</p>
          </div>
          <Button variant="outline" className="space-x-2">
            <span>Download Report</span>
            <ArrowUpRight size={16} />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                    <stat.icon size={24} />
                  </div>
                  <Badge status="confirmed">+12%</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <TrendingUp size={20} className="mr-2 text-primary" />
              Booking Trends
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.monthlyStats || []}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {appointments.slice(0, 5).map((app, idx) => (
                <div key={app._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={app.user?.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{app.user?.name}</p>
                      <p className="text-xs text-gray-500">{app.slot?.serviceName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900">{format(new Date(app.createdAt), 'MMM d, p')}</p>
                    <Badge status={app.status}>{app.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* All Appointments Table */}
        <Card className="overflow-hidden border-none shadow-md">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold">Manage Appointments</h3>
            <div className="flex space-x-2">
              <Input placeholder="Search user..." className="w-64" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Service</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Schedule</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={app.user?.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium text-gray-900">{app.user?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{app.slot?.serviceName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {format(new Date(app.slot?.date), 'PP')} at {app.slot?.time}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={app.status}>{app.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {app.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="primary"
                            onClick={() => updateStatus(app._id, 'confirmed')}
                          >
                            Approve
                          </Button>
                        )}
                        {app.status !== 'cancelled' && (
                          <Button 
                            size="sm" 
                            variant="danger"
                            onClick={() => updateStatus(app._id, 'cancelled')}
                          >
                            Reject
                          </Button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
