import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Users, Clock, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// BALI FLOCK TOURS — ABOUT PAGE (updated — no fake names)
// Replace your existing src/pages/AboutPage.tsx with this
// ============================================================

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every trip is designed with your safety as the priority. NZ-licensed security available on request, local vetted operators, and support throughout your trip.'
    },
    {
      icon: Heart,
      title: 'Passion for Bali',
      description: 'We love Bali and we know it inside out. That\'s why every package is built from personal experience — not a generic template.'
    },
    {
      icon: Users,
      title: 'Group Specialists',
      description: 'From a couple to 50+ people — we\'ve done it all. We know what makes group travel work and what can go wrong, and we plan around both.'
    },
    {
      icon: Clock,
      title: 'Stress-Free Guarantee',
      description: 'From the moment you land to the moment you leave, we handle the logistics. You just focus on having the time of your life.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-gray-900 py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80"
          alt="Bali"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Many Wings,<br />One Journey</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bali Flock Tours is a NZ-based travel specialist that organises safe, supported, and unforgettable group experiences in Bali, Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Born from a love of Bali</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bali Flock Tours was born out of a simple frustration — organising group travel is hard. Between flights, accommodation, activities, and keeping everyone happy, it becomes a full-time job before you've even left home.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We built Bali Flock Tours to solve that. We take care of everything — from your first quote to your airport drop-off at the end — so your group can focus on what actually matters: having an incredible time.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Based in New Zealand, we specialise in Bali because we know it better than anywhere. We've been there, lived the experiences, and built relationships with trusted local partners who share our standards.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80"
              alt="Bali landscape"
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="text-4xl font-black text-gray-900">Our Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-7 rounded-2xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Why Bali Flock</p>
          <h2 className="text-4xl font-black text-gray-900 mb-10">What makes us different</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'NZ-based and operated — we\'re locals you can actually talk to',
              'Personalised quotes within 24 hours',
              '$1,000 NZD deposit to lock in your trip — pay the rest 6 weeks before',
              'All transport included — airport to airport',
              'Breakfast & lunch on every activity day',
              'NZ-licensed security and tour guide available',
              'Trusted local Bali partners only',
              'Customise any package to suit your group',
              'Full Terms & Conditions and facilitator contract',
              'One point of contact from booking to departure',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-4">Ready to Book?</h2>
            <p className="text-white/80 text-lg mb-8">Browse our packages and get your quote within 24 hours.</p>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-white text-primary font-black px-10 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              View Packages <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
