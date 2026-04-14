import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Input } from '../components/UI';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[85vh] flex items-center justify-center relative px-6">
        {/* Background blobs for auth pages */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] pointer-events-none -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[40px] shadow-2xl border border-white/20"
        >
          {/* Left Side: Form */}
          <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 lg:p-16">
            <div className="mb-10">
              <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
                <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter">BookEase</span>
              </Link>
              <h1 className="text-4xl font-black text-gray-900 mb-3">Welcome back</h1>
              <p className="text-gray-500 font-medium">Log in to manage your professional schedule.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Professional Email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail size={20} />}
              />
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  icon={<Lock size={20} />}
                />
                <div className="flex justify-end">
                  <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full py-4 shadow-glow" isLoading={loading}>
                Sign In to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="mt-10 pt-10 border-t border-gray-100 text-center">
              <p className="text-gray-500 font-medium">
                New to BookEase?{' '}
                <Link to="/register" className="text-indigo-600 font-black hover:underline underline-offset-4">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side: Visual/Marketing */}
          <div className="hidden lg:block relative bg-indigo-600 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 blur-[80px] rounded-full -ml-32 -mb-32" />
            
            <div className="relative h-full flex flex-col justify-center p-16 text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl w-fit"
              >
                <Sparkles className="w-8 h-8 text-amber-300" />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-black leading-tight"
              >
                The standard for <br />
                modern businesses.
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-indigo-100 font-medium opacity-80 leading-relaxed"
              >
                "BookEase has completely transformed how we handle our client flow. The interface is intuitive and our clients love it."
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-4 pt-4"
              >
                <img src="https://i.pravatar.cc/100?u=sarah" className="w-12 h-12 rounded-full border-2 border-white/20" alt="" />
                <div>
                  <p className="font-bold">Sarah Jenkins</p>
                  <p className="text-sm text-indigo-200">Director at HealthFlow</p>
                </div>
              </motion.div>

              <div className="absolute bottom-8 left-16 flex items-center space-x-2 text-indigo-200/60 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>Enterprise Grade Security</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Login;
