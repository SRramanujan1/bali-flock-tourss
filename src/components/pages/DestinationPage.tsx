import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Heart, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function DestinationPage() {
  const highlights = [
    {
      icon: Camera,
      title: 'Iconic Temples',
      description: 'Explore ancient temples like Tanah Lot and Ubud Palace',
    },
    {
      icon: Heart,
      title: 'Pristine Beaches',
      description: 'Relax on world-class beaches with crystal-clear waters',
    },
    {
      icon: Compass,
      title: 'Cultural Experiences',
      description: 'Immerse yourself in Balinese traditions and local life',
    },
    {
      icon: MapPin,
      title: 'Adventure Activities',
      description: 'Surfing, hiking, diving, and more thrilling experiences',
    },
  ];

  const regions = [
    {
      name: 'Ubud',
      description: 'The cultural heart of Bali with rice terraces, art galleries, and traditional crafts',
      image: 'https://static.wixstatic.com/media/b57044_c899f7b46c9c4062bfba2538bd85ba0b~mv2.png?originWidth=576&originHeight=384',
    },
    {
      name: 'Seminyak',
      description: 'Trendy beach town with upscale resorts, restaurants, and vibrant nightlife',
      image: 'https://static.wixstatic.com/media/b57044_0102776d6c334ff3bc951daf0e00c567~mv2.png?originWidth=576&originHeight=384',
    },
    {
      name: 'Kuta',
      description: 'Famous for its golden beaches, surfing spots, and lively atmosphere',
      image: 'https://static.wixstatic.com/media/b57044_b74d83a048524b78b155b55b352eda5e~mv2.png?originWidth=576&originHeight=384',
    },
    {
      name: 'Sanur',
      description: 'Peaceful coastal town perfect for water sports and island hopping',
      image: 'https://static.wixstatic.com/media/b57044_b2df391c2ff549d2b51749c950da3ee7~mv2.png?originWidth=576&originHeight=384',
    },
  ];

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
      <section className="w-full bg-gradient-to-br from-accent via-primary to-secondary py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to Bali
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              The Island of Gods awaits with pristine beaches, ancient temples, and unforgettable experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Best Time to Visit', value: 'April - October' },
            { label: 'Language', value: 'Balinese & Indonesian' },
            { label: 'Currency', value: 'Indonesian Rupiah' },
            { label: 'Time Zone', value: 'UTC+8' },
          ].map((fact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl text-center"
            >
              <p className="text-muted text-sm mb-2">{fact.label}</p>
              <p className="text-2xl font-bold text-foreground">{fact.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Highlights */}
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
              Why Bali is Special
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Discover what makes Bali one of the world's most sought-after destinations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
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
                    {highlight.title}
                  </h3>
                  <p className="text-muted">{highlight.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Regions */}
      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Regions
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Each region of Bali offers unique experiences and attractions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {regions.map((region, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
                  {region.name}
                </h3>
              </div>
              <div className="bg-white p-6">
                <p className="text-muted mb-4">{region.description}</p>
                <button className="text-primary hover:text-primary-dark font-semibold transition-colors">
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Travel Tips */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Travel Tips for Bali
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Getting Around',
                  tips: ['Rent a scooter or hire a driver', 'Use ride-sharing apps', 'Taxis available at airport'],
                },
                {
                  title: 'What to Pack',
                  tips: ['Light, breathable clothing', 'Sunscreen and sunglasses', 'Comfortable walking shoes'],
                },
                {
                  title: 'Local Customs',
                  tips: ['Respect temple dress codes', 'Learn basic Indonesian phrases', 'Dress modestly in temples'],
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white"
                >
                  <h3 className="text-xl font-bold mb-4">{tip.title}</h3>
                  <ul className="space-y-2">
                    {tip.tips.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[100rem] mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Explore Bali?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Browse our curated packages and start planning your Bali adventure today
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-10 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            View Packages
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
