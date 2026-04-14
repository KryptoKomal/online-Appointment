import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Calendar, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/UI';
import MainLayout from '../layouts/MainLayout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[85vh] flex items-center justify-center relative px-6 py-12">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -z-10 rounded-l-[100px] hidden lg:block" />
        
        <div className="w-full max-w-6xl grid lg:grid-cols-5 gap-16 items-center">
          {/* Left Side: Benefits/Social Proof */}
          <div className="lg:col-span-2 space-y-10 hidden lg:block">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900 leading-tight">
                Scale your business <br />
                with <span className="gradient-text">BookEase.</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                Join 5,000+ professionals who trust us with their time and client management.
              </p>
            </div>

            <div className="space-y-6">
              {[
                'Unlimited appointment slots',
                'Advanced analytics & reporting',
                'Custom client notifications',
                'Multi-role access control'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3 text-gray-700 font-bold">
                  <div className="p-1 bg-emerald-100 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Card className="p-6 bg-white/60 border-white/40 shadow-premium">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=reg${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-sm text-gray-600 italic font-medium">
                "The best decision we made for our clinic this year. Implementation was seamless."
              </p>
            </Card>
          </div>

          {/* Right Side: Registration Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 lg:p-16 relative overflow-hidden border-none shadow-2xl">
                {/* Accent blob */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-100 blur-3xl rounded-full" />
                
                <div className="relative z-10 mb-10">
                  <h1 className="text-4xl font-black text-gray-900 mb-3">Create account</h1>
                  <p className="text-gray-500 font-medium">Start your 14-day free trial today.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      icon={<User size={20} />}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      icon={<Mail size={20} />}
                    />
                  </div>
                  
                  <Input
                    label="Choose Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<Lock size={20} />}
                  />

                  <div className="flex items-start space-x-3 pt-2">
                    <input type="checkbox" required className="mt-1.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      I agree to the <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Privacy Policy</span>.
                    </p>
                  </div>

                  <Button type="submit" className="w-full py-4 shadow-glow mt-4" isLoading={loading}>
                    Create My Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>

                <div className="relative z-10 mt-10 pt-10 border-t border-gray-100 text-center">
                  <p className="text-gray-500 font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">
                      Sign In here
                    </Link>
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
