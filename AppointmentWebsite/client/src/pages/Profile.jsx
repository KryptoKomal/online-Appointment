import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/UI';
import DashboardLayout from '../layouts/DashboardLayout';
import { User, Mail, Camera, Shield, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating update
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-500">Manage your personal information and settings.</p>
        </div>

        <Card className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer">
              <img 
                src={user?.avatar} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <div className="flex items-center justify-center space-x-1 mt-1 text-sm text-gray-500">
                <Shield size={14} className="text-primary" />
                <span className="capitalize">{user?.role} Account</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={18} />}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              disabled
            />
            <div className="pt-4">
              <Button type="submit" className="w-full py-3" disabled={loading}>
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6 border-l-4 border-l-teal-500 bg-teal-50/30">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Account Verified</h3>
              <p className="text-sm text-gray-600 mt-1">Your account is fully verified and secure. You have access to all features.</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
