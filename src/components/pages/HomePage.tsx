// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ArrowRight, Star, Sun, Moon, Users, Heart, GlassWater, Music, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Types ---
type ScrollDirection = 'left' | 'right';

// --- Utility Components ---

// MANDATORY: Intersection Observer Component for Reveals
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via style if needed, or just let CSS handle it
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className || ''}`}>{children}</div>;
};

// Parallax Image Component using CSS Variables for performance
const ParallaxImage = ({ src, alt, speed = 1, className }: { src: string, alt: string, speed?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollProgress = 1 - (rect.bottom / (window.innerHeight + rect.height));
      // Only update if visible-ish
      if (scrollProgress > -0.5 && scrollProgress < 1.5) {
        element.style.setProperty('--scroll-offset', `${scrollProgress * 100 * speed}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div 
        className="w-full h-[120%] -mt-[10%] object-cover transition-transform duration-75 ease-linear will-change-transform"
        style={{ transform: 'translateY(var(--scroll-offset, 0px))' }}
      >
        <Image src={src} alt={alt} width={800} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

// Marquee Text Component
const MarqueeText = ({ text, direction = 'left' }: { text: string, direction?: ScrollDirection }) => {
  return (
    <div className="relative flex overflow-hidden py-4 bg-primary text-primary-foreground/10 select-none pointer-events-none">
      <div className={`animate-marquee whitespace-nowrap flex gap-8 ${direction === 'right' ? 'animate-marquee-reverse' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[6rem] md:text-[10rem] font-paragraph font-black uppercase leading-none tracking-tighter">
            {text} ✦
          </span>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  // --- Data Fidelity Protocol ---
  // 1. IDENTIFY: Data source is 'holidaypackages' collection via BaseCrudService
  // 2. CANONIZE: featuredPackages state is the Source of Truth
  const [featuredPackages, setFeaturedPackages] = useState<HolidayPackages[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. PRESERVE: Original fetching logic
  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
        setFeaturedPackages(items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  // --- Styles for custom animations ---
  const customStyles = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
    .animate-marquee-reverse {
      animation: marquee 30s linear infinite reverse;
    }
    .text-stroke {
      -webkit-text-stroke: 1px rgba(138, 159, 239, 0.3);
      color: transparent;
    }
    .clip-diagonal {
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    }
    .clip-diamond {
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
  `;

  return (
    <div className="min-h-screen bg-primary text-secondary-foreground overflow-clip selection:bg-primary-foreground selection:text-primary">
      <style>{customStyles}</style>
      <Header />

      {/* --- HERO SECTION (Instagram-inspired Modern Design) --- */}
      {/* Structure: Clean, minimal, focused on imagery and typography */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden bg-gradient-to-b from-primary to-secondary">
        
        {/* Layer 1: Background Marquee/Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-1/4 w-full h-px bg-gradient-to-r from-transparent via-secondary-foreground to-transparent" />
           <div className="absolute bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-secondary-foreground to-transparent" />
        </div>

        {/* Layer 2: Massive Structural Typography (Behind Image) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-0 pointer-events-none">
          <div className="w-full max-w-[120rem] px-4 flex justify-between items-center">
             <h1 className="font-paragraph text-[12vw] leading-[0.8] text-secondary-foreground uppercase tracking-tighter text-center w-full mix-blend-overlay opacity-20">
               BALI NIGHTS
             </h1>
          </div>
        </div>

        {/* Layer 3: Central Hero Image & Side Compositions */}
        <div className="relative z-10 w-full max-w-[100rem] mx-auto h-[70vh] flex items-center justify-center">
          
          {/* Left Floating Element */}
          <div className="absolute left-4 md:left-20 top-1/4 w-48 md:w-64 aspect-[3/4] hidden md:block">
            <AnimatedElement delay={200}>
              <div className="relative w-full h-full overflow-hidden border-2 border-secondary-foreground/20">
                <Image 
                  src="https://static.wixstatic.com/media/b57044_2c00f12a4f7a4f14a0bd52a05ff402e2~mv2.png?originWidth=576&originHeight=640" 
                  alt="Bali nightlife detail"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  width={300}
                />
              </div>
            </AnimatedElement>
          </div>

          {/* Center Main Image */}
          <div className="relative w-[90vw] md:w-[35vw] h-[60vh] md:h-[80vh] z-20">
            <AnimatedElement>
              <div className="w-full h-full overflow-hidden shadow-lg shadow-secondary-foreground/20">
                <ParallaxImage 
                  src="https://static.wixstatic.com/media/b57044_785ebfbdd3c9483b8e0047c2f223f49b~mv2.png?originWidth=576&originHeight=640"
                  alt="Bali Nightlife Portrait"
                  speed={1.1}
                  className="w-full h-full"
                />
              </div>
            </AnimatedElement>
            
            {/* Script Overlays (Modern Motif) */}
            <div className="absolute -left-12 md:-left-32 top-1/3 z-30 mix-blend-multiply">
              <AnimatedElement delay={400}>
                <span className="font-heading text-[5rem] md:text-[8rem] text-primary-foreground leading-none font-bold">Nights</span>
              </AnimatedElement>
            </div>
            <div className="absolute -right-12 md:-right-32 bottom-1/4 z-30 mix-blend-multiply">
              <AnimatedElement delay={600}>
                <span className="font-heading text-[5rem] md:text-[8rem] text-primary-foreground leading-none font-bold">Vibes</span>
              </AnimatedElement>
            </div>
          </div>

          {/* Right Floating Element */}
          <div className="absolute right-4 md:right-20 bottom-1/4 w-48 md:w-64 aspect-square hidden md:block">
            <AnimatedElement delay={300}>
              <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-secondary-foreground/20">
                <Image 
                  src="https://static.wixstatic.com/media/b57044_52a291d8e2b5496d876f249b1a3e1361~mv2.png?originWidth=576&originHeight=640" 
                  alt="Bali nightlife detail"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  width={300}
                />
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="font-paragraph text-xs tracking-[0.3em] uppercase text-primary-foreground/70">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary-foreground to-transparent" />
        </div>
      </section>

      {/* --- MANIFESTO SECTION --- */}
      <section className="relative py-32 px-6 max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
             <AnimatedElement>
               <div className="aspect-[4/5] w-full overflow-hidden rounded-t-[10rem]">
                 <ParallaxImage 
                   src="https://static.wixstatic.com/media/b57044_2660e35c06c94828b6439b22a9fe3009~mv2.png?originWidth=640&originHeight=768"
                   alt="Group walking on beach"
                   speed={1.05}
                   className="w-full h-full"
                 />
               </div>
             </AnimatedElement>
          </div>
          <div className="md:col-span-7 md:pl-12">
            <AnimatedElement>
              <h2 className="font-paragraph text-4xl md:text-6xl uppercase leading-tight mb-8 text-primary-foreground">
                Not just a holiday.<br/>
                <span className="text-foreground">A Ritual.</span>
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="font-paragraph text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl mb-12">
                We craft bespoke experiences for the tribes of New Zealand and Australia. Whether it's the last night of freedom or a celebration of love, we design the perfect backdrop for your memories.
              </p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="grid grid-cols-2 gap-8 border-t border-primary-foreground/20 pt-8">
                <div>
                  <h3 className="font-heading text-3xl text-primary-foreground mb-2">Curated</h3>
                  <p className="text-sm text-foreground/60">Every detail planned to perfection.</p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl text-primary-foreground mb-2">Exclusive</h3>
                  <p className="text-sm text-foreground/60">Access to Bali's hidden gems.</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- FEATURED PACKAGES (Data Fidelity: Using Canonical Data) --- */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary to-transparent z-10" />
        
        <div className="max-w-[120rem] mx-auto px-6 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <AnimatedElement>
              <h2 className="font-paragraph text-5xl md:text-8xl uppercase text-primary tracking-tighter">
                Curated<br/>Journeys
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <Link to="/packages" className="group flex items-center gap-4 text-primary font-paragraph uppercase tracking-widest text-sm mt-8 md:mt-0">
                View All Collections
                <span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-300" />
              </Link>
            </AnimatedElement>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-primary/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
              {featuredPackages.map((pkg, index) => (
                <AnimatedElement key={pkg._id} delay={index * 100}>
                  <Link to={`/packages/${pkg._id}`} className="group block relative">
                    <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply" />
                      <Image 
                        src={pkg.mainImage || 'https://static.wixstatic.com/media/b57044_7a20a2c979234924af205269acd9aac5~mv2.png?originWidth=576&originHeight=768'}
                        alt={pkg.packageName || 'Package'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        width={600}
                      />
                      <div className="absolute top-4 right-4 z-20 bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="font-paragraph text-sm uppercase tracking-wider text-primary">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start border-b border-primary/10 pb-4 mb-4">
                      <h3 className="font-paragraph text-2xl md:text-3xl uppercase text-primary group-hover:text-linktext transition-colors">
                        {pkg.packageName}
                      </h3>
                      <ArrowRight className="w-6 h-6 text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="font-heading text-2xl text-primary/60">
                        From ${pkg.price}
                      </p>
                      <span className="text-xs uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                        Explore
                      </span>
                    </div>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary to-transparent z-10" />
      </section>

      {/* --- GROUP TYPES (Interactive Grid) --- */}
      <section className="py-32 px-6 max-w-[120rem] mx-auto">
        <AnimatedElement>
          <div className="text-center mb-24">
            <span className="font-heading text-4xl text-primary-foreground block mb-4">Find Your Tribe</span>
            <h2 className="font-paragraph text-5xl md:text-7xl uppercase text-foreground">
              Who are you <span className="text-primary-foreground italic font-serif lowercase">traveling</span> with?
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[150vh] lg:h-[80vh]">
          {/* Card 1: Stag/Hen */}
          <div className="relative group overflow-hidden h-full border border-primary-foreground/10">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <Image 
              src="https://static.wixstatic.com/media/b57044_9bb39b3f9b224b2abe8009eb905277e8~mv2.png?originWidth=576&originHeight=896"
              alt="Party Group"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={600}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <GlassWater className="w-12 h-12 text-primary-foreground mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
              <h3 className="font-paragraph text-4xl uppercase text-white mb-2">Stag & Hen</h3>
              <p className="text-white/80 max-w-xs transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Epic send-offs. VIP clubs, private villas, and memories that last a lifetime.
              </p>
            </div>
          </div>

          {/* Card 2: Couples */}
          <div className="relative group overflow-hidden h-full border border-primary-foreground/10 lg:-mt-12 lg:mb-12">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <Image 
              src="https://static.wixstatic.com/media/b57044_9e40cb854fd54a3285d4b920940cb196~mv2.png?originWidth=576&originHeight=896"
              alt="Couple Retreat"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={600}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <Heart className="w-12 h-12 text-primary-foreground mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
              <h3 className="font-paragraph text-4xl uppercase text-white mb-2">Couples</h3>
              <p className="text-white/80 max-w-xs transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Romantic seclusion. Sunset dinners, couples massages, and pure intimacy.
              </p>
            </div>
          </div>

          {/* Card 3: Friends */}
          <div className="relative group overflow-hidden h-full border border-primary-foreground/10">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            <Image 
              src="https://static.wixstatic.com/media/b57044_c0c57d7c79724a259d4adf22606a8f7f~mv2.png?originWidth=576&originHeight=896"
              alt="Friends Group"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={600}
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <Users className="w-12 h-12 text-primary-foreground mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
              <h3 className="font-paragraph text-4xl uppercase text-white mb-2">The Crew</h3>
              <p className="text-white/80 max-w-xs transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Adventure seekers. Surf trips, jungle treks, and exploring the unknown together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE BREAK --- */}
      <section className="py-12 border-y border-primary-foreground/10">
        <MarqueeText text="ESCAPE THE ORDINARY" />
      </section>

      {/* --- NIGHTLIFE SECTION (New: Finns Beach Club & Nightlife Content) --- */}
      <section className="py-32 px-6 max-w-[120rem] mx-auto">
        <AnimatedElement>
          <div className="text-center mb-24">
            <span className="font-heading text-4xl text-primary-foreground block mb-4">Experience the Night</span>
            <h2 className="font-paragraph text-5xl md:text-7xl uppercase text-secondary-foreground">
              Bali's Most <span className="text-primary-foreground font-bold">Iconic Nightlife</span>
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          {/* Finns Beach Club Feature */}
          <AnimatedElement>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image 
                src="https://static.wixstatic.com/media/b57044_de84092212cd43c3aeb86b7b0bf56a19~mv2.png?originWidth=768&originHeight=768"
                alt="Finns Beach Club Bali"
                className="w-full h-[400px] object-cover"
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Music className="w-6 h-6 text-primary-foreground" />
                <span className="font-paragraph text-sm uppercase tracking-widest text-primary-foreground font-bold">Featured Venue</span>
              </div>
              <h3 className="font-paragraph text-5xl md:text-6xl uppercase text-secondary-foreground mb-6 leading-tight">
                Finns Beach Club
              </h3>
              <p className="font-paragraph text-lg text-secondary-foreground/80 leading-relaxed mb-8">
                The ultimate beachfront destination for unforgettable nights. Finns Beach Club combines world-class DJs, premium cocktails, and stunning ocean views. Whether you're looking for a sunset aperitif or an all-night dance experience, Finns delivers the perfect backdrop for your Bali adventure.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <Sparkles className="w-5 h-5 text-primary-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-paragraph font-bold text-secondary-foreground mb-1">VIP Tables & Bottle Service</h4>
                    <p className="text-secondary-foreground/70 text-sm">Premium seating with dedicated service</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Music className="w-5 h-5 text-primary-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-paragraph font-bold text-secondary-foreground mb-1">International DJs</h4>
                    <p className="text-secondary-foreground/70 text-sm">Top electronic and house music artists</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <GlassWater className="w-5 h-5 text-primary-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-paragraph font-bold text-secondary-foreground mb-1">Signature Cocktails</h4>
                    <p className="text-secondary-foreground/70 text-sm">Expertly crafted drinks with premium spirits</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/packages"
                className="inline-flex items-center gap-3 bg-primary-foreground text-white font-paragraph text-sm uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300 font-bold"
              >
                Book Your Night
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedElement>
        </div>

        {/* Nightlife Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Beach Clubs */}
          <AnimatedElement>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-[300px]">
                <Image 
                  src="https://static.wixstatic.com/media/b57044_9bb39b3f9b224b2abe8009eb905277e8~mv2.png?originWidth=576&originHeight=896"
                  alt="Beach Clubs"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-3 group-hover:text-primary-foreground transition-colors">Beach Clubs</h3>
              <p className="text-secondary-foreground/70 mb-4">Sunset vibes, ocean breeze, and world-class entertainment. Experience Bali's most exclusive beachfront venues.</p>
              <span className="inline-flex items-center gap-2 text-primary-foreground font-bold text-sm uppercase">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </AnimatedElement>

          {/* Card 2: Rooftop Bars */}
          <AnimatedElement delay={100}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-[300px]">
                <Image 
                  src="https://static.wixstatic.com/media/b57044_9e40cb854fd54a3285d4b920940cb196~mv2.png?originWidth=576&originHeight=896"
                  alt="Rooftop Bars"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-3 group-hover:text-primary-foreground transition-colors">Rooftop Bars</h3>
              <p className="text-secondary-foreground/70 mb-4">Panoramic city views, craft cocktails, and sophisticated ambiance. Perfect for pre-party gatherings and intimate celebrations.</p>
              <span className="inline-flex items-center gap-2 text-primary-foreground font-bold text-sm uppercase">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </AnimatedElement>

          {/* Card 3: Nightclubs */}
          <AnimatedElement delay={200}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-[300px]">
                <Image 
                  src="https://static.wixstatic.com/media/b57044_c0c57d7c79724a259d4adf22606a8f7f~mv2.png?originWidth=576&originHeight=896"
                  alt="Nightclubs"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-3 group-hover:text-primary-foreground transition-colors">Nightclubs</h3>
              <p className="text-secondary-foreground/70 mb-4">High-energy dance floors, cutting-edge sound systems, and unforgettable nights. Dance until dawn with your crew.</p>
              <span className="inline-flex items-center gap-2 text-primary-foreground font-bold text-sm uppercase">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* --- RHYTHM SECTION (Intensity vs Chill) --- */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        {/* Left: High Intensity */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative group overflow-hidden border-r border-primary-foreground/10">
          <div className="absolute inset-0 bg-primary z-10 opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
          <Image 
            src="https://static.wixstatic.com/media/b57044_de84092212cd43c3aeb86b7b0bf56a19~mv2.png?originWidth=768&originHeight=768"
            alt="High Intensity Activity"
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            width={800}
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-12">
            <Sun className="w-16 h-16 text-primary-foreground mb-8 animate-spin-slow" />
            <h3 className="font-paragraph text-5xl md:text-7xl uppercase text-white mb-6">High<br/>Voltage</h3>
            <p className="text-white/80 max-w-md text-lg mb-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              For those who sleep when they're dead. Beach clubs, ATVs, surfing, and nightlife that never ends.
            </p>
            <Link to="/packages?style=high-intensity" className="inline-block border border-white/30 px-8 py-3 text-white uppercase tracking-widest hover:bg-white hover:text-primary transition-colors">
              Ignite
            </Link>
          </div>
        </div>

        {/* Right: Chill */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative group overflow-hidden">
          <div className="absolute inset-0 bg-secondary z-10 opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
          <Image 
            src="https://static.wixstatic.com/media/b57044_f30a161e47f2418abfbdf3c448567e85~mv2.png?originWidth=768&originHeight=768"
            alt="Relaxing Spa"
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            width={800}
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-12">
            <Moon className="w-16 h-16 text-primary mb-8" />
            <h3 className="font-paragraph text-5xl md:text-7xl uppercase text-primary mb-6">Deep<br/>Chill</h3>
            <p className="text-primary/80 max-w-md text-lg mb-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              Recharge your soul. Private yoga, luxury spas, floating breakfasts, and absolute silence.
            </p>
            <Link to="/packages?style=chill" className="inline-block border border-primary/30 px-8 py-3 text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">
              Exhale
            </Link>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
           <h2 className="text-[20vw] font-paragraph uppercase text-primary-foreground leading-none">BALI</h2>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedElement>
            <Star className="w-12 h-12 text-primary-foreground mx-auto mb-8" />
            <h2 className="font-paragraph text-6xl md:text-8xl uppercase text-foreground mb-8">
              Paradise is <br/>
              <span className="text-primary-foreground">Waiting</span>
            </h2>
            <p className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
              Your group's perfect itinerary is just a click away. Let us handle the details while you handle the memories.
            </p>
            <Link 
              to="/packages"
              className="inline-flex items-center gap-4 bg-primary-foreground text-primary font-paragraph text-xl uppercase px-12 py-6 hover:bg-white transition-colors duration-300"
            >
              Start Planning
              <ArrowRight className="w-6 h-6" />
            </Link>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}