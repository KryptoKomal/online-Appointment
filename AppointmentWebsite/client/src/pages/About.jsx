import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Heart, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '../components/UI';
import MainLayout from '../layouts/MainLayout';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '50k+', icon: Users },
    { label: 'Bookings Made', value: '1M+', icon: Award },
    { label: 'Countries', value: '120+', icon: Globe },
    { label: 'Satisfaction', value: '99.9%', icon: Heart },
  ];

  return (
    <MainLayout>
      <div className="space-y-20 py-12">
        {/* Story Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold">Making scheduling <span className="text-primary">seamless</span> for everyone.</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              BookEase was born out of a simple idea: that scheduling an appointment should be as easy as sending a text. 
              We've built a platform that eliminates the back-and-forth, the missed calls, and the manual entry.
            </p>
            <div className="space-y-3">
              {['Smart notifications', 'Automated reminders', 'Real-time availability'].map(item => (
                <div key={item} className="flex items-center space-x-2 text-gray-700 font-medium">
                  <CheckCircle2 size={18} className="text-teal-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-0 overflow-hidden border-none shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Team" 
                className="w-full h-auto"
              />
            </Card>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="text-center p-8 hover:bg-primary/5 transition-colors border-none">
                <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-4">
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Mission Card */}
        <Card className="bg-primary/5 border-none p-12 lg:p-20 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed italic">
              "To empower service providers with the best tools to manage their time and deliver exceptional experiences to their clients."
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default About;
