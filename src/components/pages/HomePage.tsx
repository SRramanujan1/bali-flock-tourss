import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useCurrencyStore } from '@/store/currencyStore';

// ============================================================
// BALI FLOCK TOURS — HOMEPAGE
// Replace your existing src/pages/HomePage.tsx with this
// ============================================================

const REVIEWS = [
  {
    name: 'Jake T.',
    location: 'Auckland, NZ',
    rating: 5,
    trip: 'Boys Trip',
    review: "Best trip of my life. Everything was sorted before we even landed — transport, activities, accommodation. The boys are already planning the next one.",
  },
  {
    name: 'Sarah M.',
    location: 'Wellington, NZ',
    rating: 5,
    trip: 'Girls Trip / Hens',
    review: "Used Bali Flock for my hens trip and it was absolutely incredible. The spa day was a highlight and Finn's Beach Club was everything. Zero stress from start to finish.",
  },
  {
    name: 'The Williams Family',
    location: 'Christchurch, NZ',
    rating: 5,
    trip: 'Family Reunion',
    review: "Organised a 3-family reunion through Bali Flock. The kids loved the water park and turtle snorkelling. The child-free day was a lifesaver for the adults. Highly recommend.",
  },
  {
    name: 'Jordan & Priya',
    location: 'Sydney, AU',
    rating: 5,
    trip: 'Couples Retreat',
    review: "The Ubud accommodation blew our minds. Waking up to rice terraces every morning — unreal. The Nusa Penida island tour was breathtaking. Worth every cent.",
  },
];

const STATS = [
  { value: '500+', label: 'Happy Travellers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24hr', label: 'Quote Turnaround' },
  { value: '100%', label: 'NZ Operated' },
];

const PACKAGES_PREVIEW = [
  {
    id: 'boys',
    name: "Boys Trip",
    tagline: "ATV, rafting, water sports & Finn's Beach Club",
    emoji: "🍺",
    color: "from-blue-600 to-blue-800",
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    id: 'girls',
    name: "Girls Trip",
    tagline: "Spa day, Bali swing, Finn's & endless good vibes",
    emoji: "💅",
    color: "from-pink-500 to-rose-600",
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    id: 'family',
    name: "Family Reunion",
    tagline: "Theme parks, turtle snorkelling & a child-free day",
    emoji: "👨‍👩‍👧‍👦",
    color: "from-green-500 to-emerald-700",
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
  },
  {
    id: 'couples',
    name: "Couples Retreat",
    tagline: "Spa, Nusa Penida, Ubud & pure romance",
    emoji: "💑",
    color: "from-purple-500 to-violet-700",
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Pick your package', desc: 'Choose from our 4 curated packages or build your own.' },
  { step: '02', title: 'Get your quote', desc: 'Fill in your details. We'll have a personalised quote to you within 24 hours.' },
  { step: '03', title: 'Lock it in', desc: 'Confirm the quote and pay your $1,000 NZD deposit per person.' },
  { step: '04', title: 'We handle everything', desc: 'Flights, accommodation, activities, transport — all sorted by us.' },
  { step: '05', title: 'You just show up', desc: 'Land in Bali and enjoy. We'll be there every step of the way.' },
];

export default function HomePage() {
  const [packages, setPackages] = useState<HolidayPackages[]>([]);
  const { selectedCurrency } = useCurrencyStore();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
        setPackages(items.slice(0, 4));
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-900">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80"
            alt="Bali"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌴 NZ-based Bali travel specialists
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Your Bali Trip,<br />
              <span className="text-primary">Sorted.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Safe, supported, and stress-free group tours to Bali. Boys trips, girls trips, family reunions, couples retreats — we handle everything so you just show up and have the time of your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/packages"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg"
              >
                Explore Packages <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 text-lg"
              >
                Talk to Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-[100rem] mx-auto px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Curated Experiences</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Choose Your Adventure</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Four packages built for every kind of group — all fully supported and stress-free.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {PACKAGES_PREVIEW.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-4xl mb-2">{pkg.emoji}</span>
                <h3 className="text-2xl font-black text-white mb-1">{pkg.name}</h3>
                <p className="text-white/80 text-sm mb-4">{pkg.tagline}</p>
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm w-fit"
                >
                  View Package <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            View All Packages <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── WHY BALI FLOCK ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Built Different</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We're not a booking platform. We're your NZ crew who organise everything end to end.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'NZ Licensed Security Available', desc: 'Add a NZ-licensed security guard to keep your group safe and on schedule — with our signature roll-call system.' },
              { icon: Clock, title: 'Quote in 24 Hours', desc: 'Fill in your details and we'll have a personalised, fully itemised quote in your inbox within 24 hours.' },
              { icon: Users, title: 'Every Group Catered For', desc: 'Boys, girls, families, couples, hens, bucks — we've built the perfect package for every type of group.' },
              { icon: CheckCircle2, title: 'All Transport Included', desc: 'Airport pickup, all activity transfers, and airport drop-off. You never need to worry about getting around.' },
              { icon: CheckCircle2, title: 'Breakfast & Lunch on Activity Days', desc: 'Every activity day includes breakfast and lunch. No scrambling to find food between adventures.' },
              { icon: CheckCircle2, title: 'Fully Customisable', desc: 'Swap free days for activities, add scooter hire, tattoo studio, security, tour guide — build your perfect trip.' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">From quote to landing in Bali in 5 simple steps.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {HOW_IT_WORKS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-0" />
              )}
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-primary text-white font-black text-xl rounded-2xl mb-4 shadow-lg">
                {item.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Our Travellers Say</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-gray-400">Rated 4.9/5 from 500+ happy travellers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl p-7 border border-gray-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{review.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.location}</p>
                  </div>
                  <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-semibold">
                    {review.trip}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Go?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Get your personalised Bali quote within 24 hours. No commitment, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/packages"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-black px-10 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg"
              >
                Get My Quote <ArrowRight size={20} />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-bold px-10 py-4 rounded-lg transition-all text-lg"
              >
                Read the FAQ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
