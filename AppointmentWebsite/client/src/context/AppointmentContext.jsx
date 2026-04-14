import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const API_URL = 'http://localhost:5000/api';

  const getSlots = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/slots`);
      setSlots(data);
    } catch (error) {
      toast.error('Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${API_URL}/appointments`, config);
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (slotId, note) => {
    if (!user?.token) {
      toast.error('Please login to book');
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${API_URL}/appointments`, { slotId, note }, config);
      toast.success('Appointment booked successfully!');
      getAppointments();
      getSlots();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
      throw error;
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`${API_URL}/appointments/${id}`, { status: 'cancelled' }, config);
      toast.success('Appointment cancelled');
      getAppointments();
      getSlots();
    } catch (error) {
      toast.error('Cancellation failed');
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        slots,
        appointments,
        loading,
        getSlots,
        getAppointments,
        bookAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
