import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, DollarSign, Search } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function PackagesPage() {
  const [packages, setPackages] = useState<HolidayPackages[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<HolidayPackages[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
        setPackages(items);
        setFilteredPackages(items);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    let filtered = packages;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.packageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter((pkg) => pkg.holidayStyle === selectedFilter);
    }

    setFilteredPackages(filtered);
  }, [searchTerm, selectedFilter, packages]);

  const holidayStyles = Array.from(
    new Set(packages.map((pkg) => pkg.holidayStyle).filter(Boolean))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as const;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Packages
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Choose from our carefully curated selection of Bali experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-cardbackground text-foreground hover:bg-border'
              }`}
            >
              All Packages
            </button>
            {holidayStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedFilter(style || 'all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedFilter === style
                    ? 'bg-primary text-white'
                    : 'bg-cardbackground text-foreground hover:bg-border'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-muted">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </motion.div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-[100rem] mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-cardbackground rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl font-bold text-foreground mb-2">No packages found</p>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPackages.map((pkg) => (
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
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold flex items-center gap-1">
                    <DollarSign size={16} />
                    {pkg.price}
                  </div>
                  {pkg.holidayStyle && (
                    <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {pkg.holidayStyle}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {pkg.packageName}
                  </h3>
                  <p className="text-muted text-sm mb-4 line-clamp-3">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-6 pb-6 border-b border-border">
                    {pkg.duration && (
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock size={16} className="text-secondary flex-shrink-0" />
                        <span>{pkg.duration}</span>
                      </div>
                    )}
                    {pkg.groupType && (
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Users size={16} className="text-secondary flex-shrink-0" />
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
      </section>

      <Footer />
    </div>
  );
}
