import { motion } from 'framer-motion';
import { Heart, Globe, Users, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe every journey should be unforgettable and filled with authentic experiences.'
    },
    {
      icon: Globe,
      title: 'Global Expertise',
      description: 'With years of experience across multiple destinations, we know how to craft perfect itineraries.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We prioritize creating meaningful connections between travelers and local cultures.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every package is carefully curated to ensure the highest standards of service and satisfaction.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[100rem] mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">About Bali Flock</h1>
        </div>
      </header>

      <main className="max-w-[100rem] mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Discover Your Next Adventure
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Bali Flock is your gateway to extraordinary travel experiences. We specialize in crafting personalized holiday packages that go beyond the ordinary, connecting you with the heart and soul of Bali and beyond.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded with a passion for authentic travel, we believe that the best journeys are those that create lasting memories and meaningful connections with the places and people you visit.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image 
                src="https://static.wixstatic.com/media/b57044_d20c708aa6ec4cdb9d761e228ad676a8~mv2.png?originWidth=448&originHeight=384"
                alt="Bali landscape with tropical scenery"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section 
          className="mb-20 grid md:grid-cols-2 gap-12"
          {...fadeInUp}
        >
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To create transformative travel experiences that inspire, educate, and connect people with the beauty and culture of Bali. We're committed to sustainable tourism practices that benefit both travelers and local communities.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted travel partner for those seeking authentic, personalized experiences. We envision a world where travel brings people together and creates positive impact on the destinations we serve.
            </p>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg p-12 text-white"
          {...fadeInUp}
        >
          <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl">
            Our dedicated team of travel experts, local guides, and customer service professionals are passionate about making your Bali experience unforgettable. With years of combined experience in the travel industry, we're here to turn your travel dreams into reality.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & Travel Expert', bio: '15+ years in luxury travel' },
              { name: 'Budi Santoso', role: 'Local Guide Coordinator', bio: 'Bali native with deep cultural knowledge' },
              { name: 'Emma Chen', role: 'Customer Experience Manager', bio: 'Dedicated to your satisfaction' }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-pink-300 font-semibold mb-2">{member.role}</p>
                <p className="text-white/70">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section 
          className="mb-20"
          {...fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Bali Flock?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Personalized Itineraries', desc: 'Every package is tailored to your preferences and interests.' },
              { title: '24/7 Support', desc: 'Our team is always available to assist you before, during, and after your trip.' },
              { title: 'Local Expertise', desc: 'We work with trusted local partners to ensure authentic experiences.' },
              { title: 'Best Value', desc: 'Competitive pricing without compromising on quality and service.' },
              { title: 'Flexible Packages', desc: 'Customize your adventure with our flexible booking options.' },
              { title: 'Sustainable Tourism', desc: 'We prioritize eco-friendly practices and community support.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white">
                    <span className="text-xl font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-12 text-white text-center"
          {...fadeInUp}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our curated packages and discover the perfect Bali experience for you.
          </p>
          <a
            href="/packages"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Explore Packages
          </a>
        </motion.section>
      </main>
    </div>
  );
}
