import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Check, ChevronRight, Info } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import { Button, Card, Badge, Input } from '../components/UI';
import DashboardLayout from '../layouts/DashboardLayout';
import { format, isToday, isFuture } from 'date-fns';

const Booking = () => {
  const { slots, getSlots, bookAppointment, loading } = useAppointment();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState('');
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, booking, success

  useEffect(() => {
    getSlots();
  }, []);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBookingStatus('booking');
    try {
      await bookAppointment(selectedSlot._id, note);
      setBookingStatus('success');
      setTimeout(() => {
        setBookingStatus('idle');
        setSelectedSlot(null);
        setNote('');
      }, 3000);
    } catch (error) {
      setBookingStatus('idle');
    }
  };

  // Group slots by date
  const groupedSlots = slots.reduce((acc, slot) => {
    const dateKey = format(new Date(slot.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {});

  const dates = Object.keys(groupedSlots).sort();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="text-gray-500">Choose a date and time that works best for you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Slot Selection */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2].map(i => <div key={i} className="h-48 shimmer rounded-2xl" />)}
              </div>
            ) : dates.length > 0 ? (
              dates.map((date) => (
                <div key={date} className="space-y-3">
                  <h3 className="font-bold text-gray-700 flex items-center">
                    <CalendarIcon size={18} className="mr-2 text-primary" />
                    {format(new Date(date), 'EEEE, MMMM do')}
                    {isToday(new Date(date)) && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Today</span>}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {groupedSlots[date].map((slot) => (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border-2 transition-all text-center group ${
                          selectedSlot?._id === slot._id
                            ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                            : 'border-gray-100 bg-white hover:border-primary/30'
                        }`}
                      >
                        <div className={`text-sm font-bold ${selectedSlot?._id === slot._id ? 'text-primary' : 'text-gray-700'}`}>
                          {slot.time}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">${slot.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Card className="p-12 text-center text-gray-500">
                <Info size={40} className="mx-auto mb-4 opacity-20" />
                <p>No available slots found. Please check back later.</p>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
              
              <AnimatePresence mode="wait">
                {selectedSlot ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Service</span>
                        <span className="font-bold text-gray-900">{selectedSlot.serviceName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span className="font-bold text-gray-900">{format(new Date(selectedSlot.date), 'PP')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time</span>
                        <span className="font-bold text-gray-900">{selectedSlot.time}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-gray-900 font-bold">Total Price</span>
                        <span className="text-2xl font-black text-primary">${selectedSlot.price}</span>
                      </div>
                    </div>

                    <Input
                      label="Additional Notes (Optional)"
                      placeholder="Any specific requirements?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      multiline="true"
                    />

                    <Button 
                      className="w-full py-4 space-x-2" 
                      onClick={handleBook}
                      disabled={bookingStatus !== 'idle'}
                    >
                      {bookingStatus === 'booking' ? (
                        'Processing...'
                      ) : bookingStatus === 'success' ? (
                        <div className="flex items-center space-x-2">
                          <Check size={20} />
                          <span>Booked!</span>
                        </div>
                      ) : (
                        <>
                          <span>Confirm Booking</span>
                          <ChevronRight size={18} />
                        </>
                      )}
                    </Button>

                    {bookingStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-green-50 border border-green-100 rounded-xl text-green-700 text-xs text-center"
                      >
                        Redirecting to your dashboard...
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center space-y-3"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                      <Clock size={32} />
                    </div>
                    <p className="text-gray-500 text-sm">Select a time slot to view summary and confirm booking</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            <Card className="bg-primary/5 border-none p-5">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Cancellation Policy</h4>
                  <p className="text-xs text-gray-600 mt-1">Free cancellation up to 24 hours before your appointment.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Booking;
