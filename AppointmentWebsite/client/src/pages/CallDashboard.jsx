import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  Clock, 
  MoreHorizontal,
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { cn } from '../components/UI';

const chartData = [
  { time: '7 AM', calls: 30, prev: 25 },
  { time: '9 AM', calls: 45, prev: 40 },
  { time: '11 AM', calls: 85, prev: 70 },
  { time: '1 PM', calls: 60, prev: 75 },
  { time: '3 PM', calls: 90, prev: 80 },
  { time: '5 PM', calls: 70, prev: 65 },
  { time: '7 PM', calls: 110, prev: 95 },
  { time: '10 PM', calls: 50, prev: 60 },
];

const days = Array.from({ length: 13 }, (_, i) => (i + 1).toString().padStart(2, '0'));

const CallDashboard = () => {
  const [activeDay, setActiveDay] = useState('08');
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarLinks = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'analytics', icon: BarChart3 },
    { id: 'users', icon: Users },
    { id: 'settings', icon: Settings },
  ];

  return (
    <div className="dark-dashboard flex overflow-hidden font-sans selection:bg-neon-purple selection:text-white">
      {/* Background Blobs */}
      <div className="blob blob-purple top-[-100px] right-[-100px]" />
      <div className="blob blob-purple bottom-[-200px] left-[-100px] opacity-50" />

      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center py-8 border-r border-white/5 bg-black/40 backdrop-blur-xl z-20">
        <div className="w-12 h-12 bg-gradient-to-tr from-neon-purple to-indigo-500 rounded-2xl flex items-center justify-center mb-12 shadow-lg shadow-neon-purple/20">
          <Phone className="text-white w-6 h-6" />
        </div>
        
        <div className="flex-1 flex flex-col space-y-8">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                activeTab === link.id 
                  ? "bg-white/10 text-neon-purple glow-purple" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon size={22} />
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full border-2 border-neon-purple/30 p-0.5">
            <img 
              src="https://i.pravatar.cc/100?u=admin" 
              alt="Profile" 
              className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Section */}
        <header className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={cn(
                    "w-10 h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-300 border",
                    activeDay === day
                      ? "bg-neon-purple border-neon-purple text-white shadow-lg shadow-neon-purple/30 -translate-y-1"
                      : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  )}
                >
                  <span className="text-xs opacity-60">Apr</span>
                  <span className="text-sm font-bold">{day}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-dark-bg" alt="" />
                ))}
                <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-dark-bg flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
              <button className="bg-white/5 p-2 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <Plus size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Total Calls', value: '2,482', change: '+12.5%', color: 'text-neon-purple' },
              { label: 'Success Rate', value: '94.2%', change: '+2.4%', color: 'text-emerald-400' },
              { label: 'Avg Duration', value: '4m 12s', change: '-1.2%', color: 'text-neon-yellow' },
              { label: 'Peak Hour', value: '11:00 AM', change: 'Steady', color: 'text-sky-400' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-dark p-5 rounded-3xl">
                <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5", stat.color)}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Center Section: Chart & Sidebar Panels */}
        <div className="flex-1 flex overflow-hidden px-8 pb-8 gap-8">
          {/* Main Chart Area */}
          <div className="flex-[2.5] flex flex-col gap-8">
            <div className="flex-1 glass-dark rounded-[40px] p-8 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold">Call Analytics</h2>
                  <p className="text-sm text-gray-500">Hourly performance tracking</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-neon-purple" />
                    <span className="text-xs text-gray-400">Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full border border-dashed border-neon-yellow" />
                    <span className="text-xs text-gray-400">Previous</span>
                  </div>
                </div>
              </div>

              <div className="h-[calc(100%-100px)] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#4b5563', fontSize: 10}}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#4b5563', fontSize: 10}}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#15151a', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                      }}
                      itemStyle={{fontSize: '12px'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="#a855f7" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorCalls)" 
                      animationDuration={2000}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prev" 
                      stroke="#facc15" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Ongoing Calls */}
            <div className="h-64 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-bold">Ongoing Calls</h2>
                <button className="text-xs text-neon-purple font-bold flex items-center hover:underline">
                  View All <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Alex Rivera', duration: '12:45', incoming: true, color: 'from-blue-500/20 to-indigo-500/20' },
                  { name: 'Sarah Chen', duration: '08:12', incoming: false, color: 'from-purple-500/20 to-pink-500/20' },
                  { name: 'Marcus Bell', duration: '05:30', incoming: true, color: 'from-orange-500/20 to-red-500/20' },
                ].map((call, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="glass-dark p-4 rounded-[32px] border-white/5 flex items-center space-x-4"
                  >
                    <div className="relative">
                      <img src={`https://i.pravatar.cc/100?u=${idx + 10}`} className="w-12 h-12 rounded-2xl" alt="" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-dark-bg rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{call.name}</h4>
                      <div className="flex items-center text-[10px] text-gray-500 mt-0.5">
                        <Clock size={10} className="mr-1" />
                        {call.duration}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      {call.incoming ? (
                        <PhoneIncoming size={14} className="text-sky-400" />
                      ) : (
                        <PhoneOutgoing size={14} className="text-neon-purple" />
                      )}
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col gap-8 min-w-[300px]">
            {/* Starting Calls */}
            <div className="glass-dark rounded-[40px] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Starting calls</h3>
                <MoreHorizontal size={18} className="text-gray-500 cursor-pointer" />
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Elena Gilbert', role: 'Support', id: 20 },
                  { name: 'Stefan Salvatore', role: 'Sales', id: 21 },
                  { name: 'Bonnie Bennett', role: 'Product', id: 22 },
                ].map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 group cursor-pointer">
                    <img src={`https://i.pravatar.cc/100?u=${user.id}`} className="w-10 h-10 rounded-xl group-hover:scale-110 transition-transform" alt="" />
                    <div className="flex-1">
                      <p className="text-xs font-bold">{user.name}</p>
                      <p className="text-[10px] text-gray-500">{user.role}</p>
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full py-3 rounded-2xl bg-white/5 border border-dashed border-white/10 text-xs font-bold text-gray-400 hover:bg-white/10 transition-all">
                Add to queue
              </button>
            </div>

            {/* Break Section */}
            <div className="glass-dark rounded-[40px] p-6 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Break</h3>
                <span className="text-[10px] font-bold text-neon-yellow">12 active</span>
              </div>
              
              <div className="space-y-5">
                {[
                  { name: 'Damon S.', time: '15m', active: true },
                  { name: 'Caroline F.', time: '45m', active: false },
                  { name: 'Enzo St.', time: '10m', active: true },
                  { name: 'Alaric S.', time: '05m', active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.active ? "bg-neon-yellow shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "bg-white/10"
                      )} />
                      <span className="text-xs font-medium text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-lg bg-white/5 text-gray-500 font-mono">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-br from-neon-purple/20 to-transparent rounded-3xl border border-white/5">
                <p className="text-[10px] text-neon-purple font-bold mb-1">PRO TIP</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Scheduled breaks improve team efficiency by up to <span className="text-white">15.4%</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CallDashboard;
