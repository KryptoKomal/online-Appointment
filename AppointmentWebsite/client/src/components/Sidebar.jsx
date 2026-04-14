import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  History, 
  UserCircle, 
  PlusCircle, 
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { cn } from './UI';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const userLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CalendarCheck, label: 'Book Appointment', path: '/book' },
    { icon: History, label: 'My History', path: '/history' },
    { icon: UserCircle, label: 'Profile Settings', path: '/profile' },
  ];

  const adminLinks = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: BarChart3, label: 'Call Analytics', path: '/analytics' },
    { icon: PlusCircle, label: 'Manage Slots', path: '/admin/slots' },
    { icon: Settings, label: 'System Settings', path: '/profile' },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <motion.aside
      animate={{ width: collapsed ? 100 : 280 }}
      className="fixed left-0 top-0 h-screen glass border-r border-white/20 z-40 flex flex-col pt-24 pb-8 transition-all duration-500"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-24 -right-4 p-2 bg-white border border-gray-100 rounded-2xl shadow-premium hover:shadow-glow transition-all text-indigo-600 z-50"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation Links */}
      <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <Link
          to="/"
          className="flex items-center space-x-4 px-4 py-4 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl transition-all group mb-4"
        >
          <Home size={22} className="group-hover:scale-110 transition-transform" />
          {!collapsed && <span className="font-bold tracking-tight">Return Home</span>}
        </Link>
        
        <div className="px-4 mb-4">
          {!collapsed && <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Main Menu</p>}
          <div className="h-px bg-gray-100 mt-2" />
        </div>

        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all group relative',
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50'
              )}
            >
              <link.icon 
                size={22} 
                className={cn('transition-transform duration-500 group-hover:scale-110', isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600')} 
              />
              {!collapsed && <span className="font-bold tracking-tight">{link.label}</span>}
              
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* User Section */}
      <div className="px-4 mt-auto pt-8">
        <div className={cn(
          "flex items-center p-3 bg-gray-50/50 rounded-3xl border border-gray-100 transition-all",
          collapsed ? "justify-center" : "space-x-4"
        )}>
          <div className="relative">
            <img src={user?.avatar} alt="Avatar" className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm object-cover" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-gray-900 truncate leading-none">{user?.name}</p>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-1">{user?.role}</p>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <button 
            onClick={logout}
            className="w-full mt-4 flex items-center justify-center space-x-2 p-4 text-rose-600 font-bold hover:bg-rose-50 rounded-2xl transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
