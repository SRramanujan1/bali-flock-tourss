import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { MapPin, Sun, Palmtree, Waves, Utensils, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DestinationPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto pt-32 pb-16 px-6">
        <div className="text-center mb-12">
          <h1 className="font-paragraph text-6xl md:text-8xl uppercase text-primary-foreground mb-6">
            Discover Bali
          </h1>
          <p className="font-paragraph text-lg text-foreground max-w-3xl mx-auto">
            The Island of the Gods awaits with pristine beaches, ancient temples, lush rice terraces, and vibrant culture
          </p>
        </div>

        <div className="aspect-[21/9] overflow-hidden">
          <Image 
            src="https://static.wixstatic.com/media/b57044_4db02ef2199b4ee292619ca89163fac3~mv2.png?originWidth=1600&originHeight=640"
            alt="Beautiful Bali landscape"
            className="w-full h-full object-cover"
            width={1600}
          />
        </div>
      </section>

      {/* Why Bali Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-paragraph text-5xl md:text-6xl uppercase text-primary-foreground mb-6">
            Why Bali?
          </h2>
          <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
            From Australia and New Zealand, Bali is your closest tropical paradise offering unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-linktext/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-linktext" />
            </div>
            <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-4">
              Easy to Reach
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/70">
              Direct flights from major cities in Australia and New Zealand, just hours away from paradise
            </p>
          </div>

          <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-linktext/10 flex items-center justify-center">
              <Sun className="w-8 h-8 text-linktext" />
            </div>
            <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-4">
              Perfect Weather
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/70">
              Year-round tropical climate with warm temperatures and endless sunshine for your group getaway
            </p>
          </div>

          <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-linktext/10 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-linktext" />
            </div>
            <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-4">
              Great Value
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/70">
              Affordable luxury with world-class accommodations, dining, and activities at incredible prices
            </p>
          </div>

          <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-linktext/10 flex items-center justify-center">
              <Palmtree className="w-8 h-8 text-linktext" />
            </div>
            <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-4">
              Diverse Landscapes
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/70">
              From volcanic mountains to pristine beaches, rice terraces to jungle waterfalls
            </p>
          </div>

          <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-linktext/10 flex items-center justify-center">
              <Utensils className="w-8 h-8 text-linktext" />
            </div>
            <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-4">
              Amazing Cuisine
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/70">
              Incredible food scene from traditional warungs to world-class restaurants and beach clubs
            </p>
          </div>

          <div className="bg-secondary p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-linktext/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-linktext" />
            </div>
            <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground mb-4">
              Rich Culture
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/70">
              Ancient temples, traditional ceremonies, and warm Balinese hospitality create magical experiences
            </p>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-paragraph text-5xl md:text-6xl uppercase text-primary-foreground mb-6">
            Explore the Regions
          </h2>
        </div>

        <div className="space-y-16">
          {/* Seminyak */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] overflow-hidden">
              <Image 
                src="https://static.wixstatic.com/media/b57044_a1c940fc2b93467ab6b0212f8a72ce72~mv2.png?originWidth=576&originHeight=448"
                alt="Seminyak beach clubs"
                className="w-full h-full object-cover"
                width={600}
              />
            </div>
            <div>
              <h3 className="font-heading text-5xl text-primary-foreground mb-4">
                Seminyak
              </h3>
              <p className="font-paragraph text-lg text-foreground mb-6">
                The sophisticated heart of Bali's beach scene, perfect for groups seeking upscale beach clubs, world-class dining, designer shopping, and vibrant nightlife. Ideal for stag and hen parties wanting luxury and excitement.
              </p>
              <ul className="font-paragraph text-base text-foreground/80 space-y-2">
                <li>• Iconic beach clubs like Potato Head and Ku De Ta</li>
                <li>• Trendy restaurants and rooftop bars</li>
                <li>• High-end boutiques and spas</li>
                <li>• Stunning sunset views</li>
              </ul>
            </div>
          </div>

          {/* Ubud */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-heading text-5xl text-primary-foreground mb-4">
                Ubud
              </h3>
              <p className="font-paragraph text-lg text-foreground mb-6">
                Bali's cultural and spiritual center nestled in lush jungle and rice terraces. Perfect for couples and groups seeking wellness, yoga retreats, art galleries, and authentic Balinese culture in a serene setting.
              </p>
              <ul className="font-paragraph text-base text-foreground/80 space-y-2">
                <li>• Tegallalang rice terraces</li>
                <li>• Sacred Monkey Forest sanctuary</li>
                <li>• Traditional art markets and galleries</li>
                <li>• Yoga studios and wellness retreats</li>
              </ul>
            </div>
            <div className="aspect-[4/3] overflow-hidden order-1 lg:order-2">
              <Image 
                src="https://static.wixstatic.com/media/b57044_8809379826de4d8e91d7796ee0e391bc~mv2.png?originWidth=576&originHeight=448"
                alt="Ubud rice terraces"
                className="w-full h-full object-cover"
                width={600}
              />
            </div>
          </div>

          {/* Canggu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] overflow-hidden">
              <Image 
                src="https://static.wixstatic.com/media/b57044_f71eff1d58e3485f87e8828746f1a69c~mv2.png?originWidth=576&originHeight=448"
                alt="Canggu surf beach"
                className="w-full h-full object-cover"
                width={600}
              />
            </div>
            <div>
              <h3 className="font-heading text-5xl text-primary-foreground mb-4">
                Canggu
              </h3>
              <p className="font-paragraph text-lg text-foreground mb-6">
                The laid-back surfer's paradise with a bohemian vibe. Great for active groups wanting surf lessons, beach bars, healthy cafes, and a relaxed atmosphere with plenty of adventure activities nearby.
              </p>
              <ul className="font-paragraph text-base text-foreground/80 space-y-2">
                <li>• World-class surf breaks</li>
                <li>• Trendy beach clubs and cafes</li>
                <li>• Rice paddy walks and cycling</li>
                <li>• Vibrant expat community</li>
              </ul>
            </div>
          </div>

          {/* Nusa Dua */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-heading text-5xl text-primary-foreground mb-4">
                Nusa Dua
              </h3>
              <p className="font-paragraph text-lg text-foreground mb-6">
                Bali's premium resort enclave with pristine white-sand beaches and luxury hotels. Perfect for groups wanting a more relaxed, upscale experience with water sports, golf, and pampered resort living.
              </p>
              <ul className="font-paragraph text-base text-foreground/80 space-y-2">
                <li>• Luxury 5-star resorts</li>
                <li>• Calm, crystal-clear waters</li>
                <li>• Water sports and golf courses</li>
                <li>• Family-friendly atmosphere</li>
              </ul>
            </div>
            <div className="aspect-[4/3] overflow-hidden order-1 lg:order-2">
              <Image 
                src="https://static.wixstatic.com/media/b57044_da8ba755319048458f5dad1de2da4080~mv2.png?originWidth=576&originHeight=448"
                alt="Nusa Dua luxury resort"
                className="w-full h-full object-cover"
                width={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-paragraph text-5xl md:text-6xl uppercase text-primary-foreground mb-6">
            Endless Adventures
          </h2>
          <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
            Whether you seek adrenaline or relaxation, Bali offers experiences for every type of traveler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-secondary p-10">
            <div className="flex items-center gap-3 mb-6">
              <Waves className="w-8 h-8 text-linktext" />
              <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground">
                Adventure Activities
              </h3>
            </div>
            <ul className="font-paragraph text-base text-secondary-foreground/80 space-y-3">
              <li>• Surfing lessons and board rentals</li>
              <li>• Scuba diving and snorkeling</li>
              <li>• White water rafting</li>
              <li>• ATV and jungle trekking</li>
              <li>• Mount Batur sunrise hikes</li>
              <li>• Waterfall rappelling</li>
              <li>• Jet skiing and parasailing</li>
            </ul>
          </div>

          <div className="bg-secondary p-10">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-linktext" />
              <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground">
                Relaxation & Wellness
              </h3>
            </div>
            <ul className="font-paragraph text-base text-secondary-foreground/80 space-y-3">
              <li>• Traditional Balinese massages</li>
              <li>• Yoga and meditation retreats</li>
              <li>• Luxury spa treatments</li>
              <li>• Beach club lounging</li>
              <li>• Sunset cocktails and dining</li>
              <li>• Private villa pool parties</li>
              <li>• Cooking classes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practical Info Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-24">
        <div className="bg-secondary p-12">
          <h2 className="font-paragraph text-4xl uppercase text-secondary-foreground mb-8 text-center">
            Practical Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="font-paragraph text-lg uppercase text-linktext mb-3">
                Best Time to Visit
              </h4>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                April to October for dry season, but Bali is beautiful year-round. Peak season is July-August and December-January.
              </p>
            </div>

            <div>
              <h4 className="font-paragraph text-lg uppercase text-linktext mb-3">
                Currency
              </h4>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Indonesian Rupiah (IDR). ATMs widely available. Credit cards accepted at most hotels and restaurants.
              </p>
            </div>

            <div>
              <h4 className="font-paragraph text-lg uppercase text-linktext mb-3">
                Visa Requirements
              </h4>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Visa on arrival available for Australian and New Zealand passport holders for stays up to 30 days.
              </p>
            </div>

            <div>
              <h4 className="font-paragraph text-lg uppercase text-linktext mb-3">
                Language
              </h4>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Bahasa Indonesia is official, but English is widely spoken in tourist areas.
              </p>
            </div>

            <div>
              <h4 className="font-paragraph text-lg uppercase text-linktext mb-3">
                Getting Around
              </h4>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                Private drivers, scooter rentals, and ride-hailing apps like Grab and Gojek are popular options.
              </p>
            </div>

            <div>
              <h4 className="font-paragraph text-lg uppercase text-linktext mb-3">
                Time Zone
              </h4>
              <p className="font-paragraph text-base text-secondary-foreground/80">
                GMT+8 (WITA). Just 2-4 hours behind Australia and 4-6 hours behind New Zealand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="font-paragraph text-5xl md:text-6xl uppercase text-primary-foreground mb-6">
            Ready to Explore Bali?
          </h2>
          <p className="font-paragraph text-lg text-foreground mb-12 max-w-2xl mx-auto">
            Browse our curated packages designed specifically for groups from Australia and New Zealand
          </p>
          <Link 
            to="/packages"
            className="inline-block font-heading text-2xl text-primary-foreground border-2 border-buttonborder px-12 py-4 hover:bg-primary-foreground hover:text-primary transition-all"
          >
            View All Packages
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}
