import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Users, Star } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const [packages, setPackages] = useState<HolidayPackages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
        setPackages(items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/b57044_9e7dab94a041431199807ea4e3d32742~mv2.png?id=beach-bean-bag-coconut"
            alt="Relaxing tropical beach scene with bean bag chair and coconut drink with straw"
            className="w-full h-full object-cover"
            width={1600}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-[100rem] mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Bali's Magic
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Unforgettable adventures await. Explore pristine beaches, ancient temples, and vibrant culture with Bali Flock Tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/packages"
                className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Explore Packages <ArrowRight size={20} />
              </Link>
              <button className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition-all duration-200">
                Learn More
              </button>
            </div>
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Packages
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Handpicked experiences designed to create lasting memories
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-cardbackground rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg._id}
                variants={itemVariants}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  {pkg.mainImage && (
                    <Image
                      src={pkg.mainImage}
                      alt={pkg.packageName || 'Package'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                    ${pkg.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {pkg.packageName}
                  </h3>
                  <p className="text-muted text-sm mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {pkg.duration && (
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock size={16} className="text-secondary" />
                        <span>{pkg.duration}</span>
                      </div>
                    )}
                    {pkg.groupType && (
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Users size={16} className="text-secondary" />
                        <span>{pkg.groupType}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/packages/${pkg._id}`}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 inline-block text-center"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold text-lg transition-colors"
          >
            View All Packages <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/10 py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Bali Flock
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              We're committed to creating unforgettable experiences
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
                icon: MapPin,
                title: 'Expert Guides',
                description: 'Local experts who know Bali inside and out',
              },
              {
                icon: Star,
                title: 'Premium Quality',
                description: 'Handpicked accommodations and experiences',
              },
              {
                icon: Users,
                title: 'Small Groups',
                description: 'Intimate group sizes for personalized attention',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Round-the-clock customer support',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Bali Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your dream vacation today and create memories that last a lifetime.
            </p>
            <button className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2">
              Start Booking <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
