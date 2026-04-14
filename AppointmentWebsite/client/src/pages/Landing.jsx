import { motion } from 'framer-motion';
import { 
  Calendar, 
  Shield, 
  Clock, 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  CheckCircle2,
  ChevronRight,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, SectionHeader, cn } from '../components/UI';
import MainLayout from '../layouts/MainLayout';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Smart Scheduling',
      description: 'AI-powered slot management that optimizes your daily workflow effortlessly.',
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption for all your patient and client data.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Sync',
      description: 'Real-time notifications and calendar syncing across all your devices.',
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <MainLayout>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] hero-gradient pointer-events-none -z-10" />
      
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                <span className="text-sm font-bold text-indigo-700">New: AI Slot Optimization</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
                Bookings made <br />
                <span className="gradient-text">effortless.</span>
              </h1>
              
              <p className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
                The most advanced appointment booking platform for modern businesses. 
                Scale your operations with beautiful, automated scheduling.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto shadow-glow">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    <Play className="mr-2 w-5 h-5 fill-current" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-8 border-t border-gray-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover"
                      src={`https://i.pravatar.cc/150?u=user${i}`}
                      alt="User"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-bold text-gray-900">4.9/5 from 2,000+ businesses</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="flex-1 relative"
            >
              <div className="absolute -inset-4 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
              <div className="relative">
                <Card className="p-2 bg-white/40 backdrop-blur-xl border-white/50 rotate-2 hover:rotate-0 transition-all duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1600880210837-2199b35216df?q=80&w=2000&auto=format&fit=crop" 
                    alt="Dashboard Preview"
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-10 -right-10 glass p-5 rounded-3xl shadow-premium border-white/50 hidden md:block"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="text-white w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400">Appointment Booked</p>
                        <p className="text-sm font-black text-gray-900">Dr. Sarah Smith</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -bottom-10 -left-10 glass p-5 rounded-3xl shadow-premium border-white/50 hidden md:block"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
                        <Calendar className="text-white w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400">Next Available</p>
                        <p className="text-sm font-black text-gray-900">Today, 4:30 PM</p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader 
            centered 
            title="Engineered for excellence" 
            subtitle="Everything you need to manage your time, team, and clients in one unified platform." 
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-10"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="h-full hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group border-none">
                  <div className={cn(
                    "w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 duration-500 shadow-sm",
                    feature.color
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                  <button className="mt-8 flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
                    <span>Explore feature</span>
                    <ChevronRight size={18} />
                  </button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {['Healthcare', 'Logistics', 'Education', 'Technology', 'Retail'].map(brand => (
              <span key={brand} className="text-2xl font-black tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[48px] overflow-hidden bg-indigo-600 p-12 lg:p-24 text-center"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 blur-[120px] rounded-full -ml-48 -mb-48" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                Ready to transform your booking experience?
              </h2>
              <p className="text-xl text-indigo-100 font-medium opacity-90">
                Join 5,000+ businesses already scaling with BookEase. <br />
                No credit card required. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto px-12">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
