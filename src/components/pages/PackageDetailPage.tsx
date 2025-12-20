import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, MapPin, DollarSign, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages, Activities } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useCurrencyStore, convertPrice, formatPrice } from '@/store/currencyStore';

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<HolidayPackages | null>(null);
  const [activities, setActivities] = useState<Activities[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCurrency } = useCurrencyStore();

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) return;
      try {
        const item = await BaseCrudService.getById<HolidayPackages>('holidaypackages', id);
        setPkg(item);
        
        // Fetch all activities
        const { items } = await BaseCrudService.getAll<Activities>('activities');
        setActivities(items || []);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-cardbackground rounded-xl"></div>
            <div className="h-12 bg-cardbackground rounded-lg w-1/2"></div>
            <div className="h-24 bg-cardbackground rounded-lg"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Package not found</h1>
          <Link to="/packages" className="text-primary hover:text-primary-dark font-semibold">
            Back to Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inclusionItems = pkg.inclusions
    ? pkg.inclusions.split('\n').filter((item) => item.trim())
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Button */}
      <div className="max-w-[100rem] mx-auto px-6 pt-8">
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Packages
        </Link>
      </div>

      {/* Hero Image */}
      <section className="max-w-[100rem] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
        >
          {pkg.mainImage && (
            <Image
              src={pkg.mainImage}
              alt={pkg.packageName || 'Package'}
              className="w-full h-full object-cover"
              width={1200}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {pkg.packageName}
            </h1>
            {pkg.holidayStyle && (
              <span className="inline-block bg-secondary text-white px-4 py-2 rounded-full font-semibold">
                {pkg.holidayStyle}
              </span>
            )}
          </div>
        </motion.div>
      </section>

      {/* Package Info */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-lg text-muted leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* Activities */}
            {activities.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Activities Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 p-4 bg-cardbackground rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">{activity.name}</h3>
                        <p className="text-sm text-muted mb-2">{activity.description}</p>
                        {activity.location && (
                          <p className="text-xs text-muted-foreground">📍 {activity.location}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions */}
            {inclusionItems.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inclusionItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-success/10 rounded-lg"
                    >
                      <CheckCircle size={20} className="text-success flex-shrink-0 mt-1" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white shadow-2xl">
              {/* Price */}
              <div className="mb-8">
                <p className="text-white/80 text-sm mb-2">Starting from</p>
                <p className="text-5xl font-bold">{formatPrice(convertPrice(pkg.price || 0, selectedCurrency), selectedCurrency)}</p>
                <p className="text-white/80 text-sm mt-2">per person</p>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8 pb-8 border-b border-white/20">
                {pkg.duration && (
                  <div className="flex items-center gap-3">
                    <Clock size={20} />
                    <div>
                      <p className="text-white/80 text-sm">Duration</p>
                      <p className="font-semibold">{pkg.duration}</p>
                    </div>
                  </div>
                )}
                {pkg.groupType && (
                  <div className="flex items-center gap-3">
                    <Users size={20} />
                    <div>
                      <p className="text-white/80 text-sm">Group Type</p>
                      <p className="font-semibold">{pkg.groupType}</p>
                    </div>
                  </div>
                )}
                {pkg.holidayStyle && (
                  <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <div>
                      <p className="text-white/80 text-sm">Style</p>
                      <p className="font-semibold">{pkg.holidayStyle}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  to={`/packages/${id}/customize`}
                  className="block w-full bg-white text-primary hover:bg-gray-100 font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
                >
                  Customize Package
                </Link>
                <button className="w-full border-2 border-white text-white hover:bg-white/10 font-bold py-3 rounded-lg transition-all duration-200">
                  Request Info
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-8 pt-8 border-t border-white/20 text-center">
                <p className="text-white/80 text-sm">✓ Trusted by 10,000+ travelers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Packages CTA */}
      <section className="bg-secondary/10 py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Explore More Packages
            </h2>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              View All Packages
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
