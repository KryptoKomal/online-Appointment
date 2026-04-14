import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Plus, Trash2, Edit2, Calendar as CalendarIcon, Clock, DollarSign, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Input, Badge } from '../components/UI';
import DashboardLayout from '../layouts/DashboardLayout';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ManageSlots = () => {
  const { user } = useAuth();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, [user.token]);

  const fetchSlots = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/slots/admin', config);
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/slots', { date, time, price, serviceName }, config);
      toast.success('Slot added successfully');
      setIsAdding(false);
      resetForm();
      fetchSlots();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding slot');
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slot?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/slots/${id}`, config);
      toast.success('Slot deleted');
      fetchSlots();
    } catch (error) {
      toast.error('Error deleting slot');
    }
  };

  const resetForm = () => {
    setDate('');
    setTime('');
    setPrice('');
    setServiceName('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Slots</h1>
            <p className="text-gray-500">Create and manage appointment time slots.</p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)} className="space-x-2">
            <Plus size={18} />
            <span>{isAdding ? 'Cancel' : 'Add New Slot'}</span>
          </Button>
        </div>

        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <Card className="p-6 bg-primary/5 border-primary/20">
              <form onSubmit={handleAddSlot} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <Input 
                  label="Service Name" 
                  placeholder="e.g. Consultation" 
                  value={serviceName} 
                  onChange={(e) => setServiceName(e.target.value)}
                  required 
                />
                <Input 
                  label="Date" 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  required 
                />
                <Input 
                  label="Time" 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                  required 
                />
                <Input 
                  label="Price ($)" 
                  type="number" 
                  placeholder="50" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  required 
                />
                <div className="lg:col-span-4 flex justify-end pt-4">
                  <Button type="submit">Create Slot</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        <Card className="overflow-hidden border-none shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Service</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Time</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="6" className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-lg w-full" /></td>
                    </tr>
                  ))
                ) : slots.length > 0 ? (
                  slots.map((slot) => (
                    <tr key={slot._id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">{slot.serviceName}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{format(new Date(slot.date), 'PP')}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{slot.time}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">${slot.price}</td>
                      <td className="px-6 py-4">
                        <Badge status={slot.status}>{slot.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteSlot(slot._id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center text-gray-500">
                      No slots created yet.
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

export default ManageSlots;
