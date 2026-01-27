import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Zap, Music, Flame, Star } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages, CustomerTestimonials } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { updateBucksPartyImage } from '@/services/updateBucksPartyImage';

export default function HomePage() {
  const [packages, setPackages] = useState<HolidayPackages[]>([]);
  const [testimonials, setTestimonials] = useState<CustomerTestimonials[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update bucks party image on page load
        await updateBucksPartyImage();

        const [packagesData, testimonialsData] = await Promise.all([
          BaseCrudService.getAll<HolidayPackages>('holidaypackages'),
          BaseCrudService.getAll<CustomerTestimonials>('testimonials'),
        ]);
        setPackages(packagesData.items);
        setTestimonials(testimonialsData.items.filter(t => t.isApproved));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      <Header />
      {/* Hero Section with Video Background */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden min-h-[600px] md:min-h-[800px] flex items-center justify-center">
        {/* Video Background Container */}
        <div className="absolute inset-0 z-0">
          {/* Fallback Image if video not available */}
          <Image
            src="https://static.wixstatic.com/media/b57044_7b3d87706cbb49529e5b4264a4c47ca3~mv2.png?id=fins-beach-club-dusk-people"
            alt="Fins Beach Club party vibes with people enjoying the beach"
            className="w-full h-full object-cover"
            width={1600}
          />
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/50 to-black/70"></div>
          
          {/* Animated Glow Effects */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            animate={{ 
              y: [0, 30, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="max-w-[100rem] mx-auto px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6 leading-tight drop-shadow-lg">
              Welcome to Bali Flock Tours
            </h1>
            <p className="text-lg md:text-xl text-purple-100/95 mb-8 max-w-3xl mx-auto font-semibold leading-relaxed">
              We specialise in Safe, Supported, Fun & stress-free Group tours to Bali. Have it your way, with options for hens groups, bucks party's, boys trips/Girl trips & couples retreats we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/packages"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black px-10 py-4 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50"
                >
                  Explore Packages <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.button 
                className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 font-bold px-10 py-4 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Floating Party Icons */}
          <motion.div
            className="absolute top-20 left-10 text-pink-400"
            animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >

          </motion.div>
          <motion.div
            className="absolute top-32 right-10 text-cyan-400"
            animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >

          </motion.div>
        </div>
      </section>
      {/* Featured Packages */}
      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
            Our Packages
          </h2>
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto font-semibold">
            Choose from our curated selection of unforgettable Bali experiences
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-2xl h-96 animate-pulse border border-purple-500/30"></div>
            ))}
          </div>
        ) : packages.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg._id}
                variants={itemVariants}
                className="group bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-4 backdrop-blur-sm"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-900 to-slate-900">
                  {pkg.mainImage && (
                    <Image
                      src={pkg.mainImage}
                      alt={pkg.packageName || 'Package'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <motion.div 
                    className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-black shadow-lg shadow-purple-500/50"
                    whileHover={{ scale: 1.1 }}
                  >
                    ${pkg.price}
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
                    {pkg.packageName}
                  </h3>
                  <p className="text-purple-200/70 text-sm mb-4 line-clamp-2 font-medium">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {pkg.duration && (
                      <div className="flex items-center gap-2 text-sm text-purple-200/60">
                        <Clock size={16} className="text-cyan-400" />
                        <span className="font-medium">{pkg.duration}</span>
                      </div>
                    )}
                    {pkg.groupType && (
                      <div className="flex items-center gap-2 text-sm text-purple-200/60">
                        <Users size={16} className="text-pink-400" />
                        <span className="font-medium">{pkg.groupType}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/packages/${pkg._id}`}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black py-3 rounded-lg transition-all duration-200 transform hover:scale-105 inline-block text-center shadow-lg shadow-purple-500/50"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-purple-200/60 text-lg">No packages available yet. Check back soon!</p>
          </div>
        )}
      </section>
      {/* Testimonials Section */}
      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto font-semibold">
            Real experiences from real travelers who've had the time of their lives
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-2xl h-80 animate-pulse border border-purple-500/30"></div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial._id}
                variants={itemVariants}
                className="group bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-4 backdrop-blur-sm p-8 flex flex-col"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < (testimonial.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-purple-400/30'}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-purple-200/80 font-medium mb-6 flex-grow italic">
                  "{testimonial.reviewText}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-purple-500/30">
                  {testimonial.customerImage && (
                    <Image
                      src={testimonial.customerImage}
                      alt={testimonial.customerName || 'Customer'}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                    />
                  )}
                  <div>
                    <h4 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                      {testimonial.customerName}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-purple-200/60 text-lg">No testimonials available yet. Be the first to share your experience!</p>
          </div>
        )}
      </section>
      {/* Why Choose Us Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-transparent"></div>
        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
              Why Choose Bali Flock
            </h2>
            <p className="text-lg text-purple-200/80 max-w-2xl mx-auto font-semibold">
              We're committed to creating unforgettable party experiences
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Flame,
                title: 'Epic Venues',
                description: 'Access to the hottest beach clubs and party spots',
              },
              {
                icon: Music,
                title: 'VIP Experience',
                description: 'Premium tables, exclusive events, and special access',
              },
              {
                icon: Users,
                title: 'Party Crew',
                description: 'Meet fellow travelers and make lifelong friends',
              },
              {
                icon: Zap,
                title: '24/7 Support',
                description: 'Round-the-clock party coordination and assistance',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 text-center backdrop-blur-sm group"
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50 group-hover:shadow-pink-500/50"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200/70 font-medium">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <motion.div
          className="absolute top-0 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
          animate={{ 
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />
        
        <div className="max-w-[100rem] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
              Ready for the Ultimate Party?
            </h2>
            <p className="text-xl text-purple-200/90 mb-8 max-w-2xl mx-auto font-semibold">
              Book your Bali party experience today and create memories that last a lifetime.
            </p>
            <motion.button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black px-12 py-4 rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-lg shadow-purple-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Booking <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
