import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, LogOut, Menu, X, Settings, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button, cn } from './UI';
import { Palette, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const navigate = useNavigate();

  const themes = [
    { id: 'modern', label: 'Modern', icon: '✨' },
    { id: 'neubrutalism', label: 'Neubrutalism', icon: '🎨' },
    { id: 'neumorphism', label: 'Neumorphism', icon: '🌑' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2.5 bg-indigo-600 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-indigo-500/20">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none">BookEase</span>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">Scheduling Pro</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {/* Theme Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-sm font-bold text-gray-700"
              >
                <Palette size={18} className="text-indigo-600" />
                <span>{themes.find(t => t.id === theme)?.label}</span>
                <ChevronDown size={14} className={cn("transition-transform", isThemeMenuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-2 right-0 w-48 glass-card border-white/20 p-2 z-50 overflow-hidden"
                  >
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          toggleTheme(t.id);
                          setIsThemeMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all text-sm font-bold",
                          theme === t.id 
                            ? "bg-indigo-600 text-white" 
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-8">
              <Link to="/" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Solutions</Link>
              <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Company</Link>
              <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Pricing</Link>
            </div>
            
            <div className="h-8 w-px bg-gray-100" />

            {user ? (
              <div className="flex items-center space-x-5">
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="secondary" size="sm" className="space-x-2 border-indigo-100">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                      <User size={12} className="text-white" />
                    </div>
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 px-4 transition-colors">Sign In</Link>
                <Link to="/register">
                  <Button size="sm" className="shadow-glow">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2 bg-gray-50 rounded-xl">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/20 p-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-lg font-bold text-gray-900 px-2">Solutions</Link>
              <Link to="/about" className="text-lg font-bold text-gray-900 px-2">Company</Link>
              <div className="h-px bg-gray-100 my-2" />
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-2xl text-indigo-700 font-bold">
                    <User size={20} />
                    <span>Go to Dashboard</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center space-x-3 p-3 text-rose-600 font-bold">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/login"><Button variant="outline" className="w-full py-4">Sign In</Button></Link>
                  <Link to="/register"><Button className="w-full py-4 shadow-glow">Get Started Free</Button></Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
