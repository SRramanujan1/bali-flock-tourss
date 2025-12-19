import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ArrowLeft, Clock, DollarSign, Users, Sparkles } from 'lucide-react';

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [packageData, setPackageData] = useState<HolidayPackages | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) return;
      
      try {
        const data = await BaseCrudService.getById<HolidayPackages>('holidaypackages', id);
        setPackageData(data);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 py-32">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-secondary/20 w-2/3" />
            <div className="h-96 bg-secondary/20" />
            <div className="h-32 bg-secondary/20" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 py-32 text-center">
          <h1 className="font-paragraph text-4xl uppercase text-primary-foreground mb-6">
            Package Not Found
          </h1>
          <Link 
            to="/packages"
            className="inline-flex items-center gap-2 font-paragraph text-lg uppercase text-linktext hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      {/* Back Link */}
      <div className="max-w-[120rem] mx-auto px-6 pt-32 pb-8">
        <Link 
          to="/packages"
          className="inline-flex items-center gap-2 font-paragraph text-base uppercase text-foreground hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Packages
        </Link>
      </div>

      {/* Hero Image */}
      <section className="max-w-[120rem] mx-auto px-6 pb-16">
        <div className="aspect-[21/9] overflow-hidden">
          <Image 
            src={packageData.mainImage || 'https://static.wixstatic.com/media/b57044_e855be5756b24f2b8af04b47b857f9cd~mv2.png?originWidth=1600&originHeight=640'}
            alt={packageData.packageName || 'Holiday package'}
            className="w-full h-full object-cover"
            width={1600}
          />
        </div>
      </section>

      {/* Package Header */}
      <section className="max-w-[120rem] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex gap-3 mb-6">
              {packageData.groupType && (
                <span className="font-paragraph text-sm uppercase px-4 py-2 bg-linktext/10 text-linktext">
                  {packageData.groupType}
                </span>
              )}
              {packageData.holidayStyle && (
                <span className="font-paragraph text-sm uppercase px-4 py-2 bg-linktext/10 text-linktext">
                  {packageData.holidayStyle}
                </span>
              )}
            </div>
            
            <h1 className="font-paragraph text-5xl md:text-7xl uppercase text-primary-foreground mb-6">
              {packageData.packageName}
            </h1>
            
            <p className="font-paragraph text-lg text-foreground leading-relaxed">
              {packageData.description}
            </p>
          </div>

          <div className="bg-secondary p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-linktext flex-shrink-0 mt-1" />
                <div>
                  <p className="font-paragraph text-sm uppercase text-secondary-foreground/70 mb-1">
                    Price
                  </p>
                  <p className="font-paragraph text-3xl text-secondary-foreground">
                    ${packageData.price}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-linktext flex-shrink-0 mt-1" />
                <div>
                  <p className="font-paragraph text-sm uppercase text-secondary-foreground/70 mb-1">
                    Duration
                  </p>
                  <p className="font-paragraph text-xl text-secondary-foreground">
                    {packageData.duration}
                  </p>
                </div>
              </div>

              {packageData.groupType && (
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-linktext flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-paragraph text-sm uppercase text-secondary-foreground/70 mb-1">
                      Group Type
                    </p>
                    <p className="font-paragraph text-xl text-secondary-foreground">
                      {packageData.groupType}
                    </p>
                  </div>
                </div>
              )}

              {packageData.holidayStyle && (
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-linktext flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-paragraph text-sm uppercase text-secondary-foreground/70 mb-1">
                      Holiday Style
                    </p>
                    <p className="font-paragraph text-xl text-secondary-foreground">
                      {packageData.holidayStyle}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button className="w-full mt-8 font-heading text-xl text-primary-foreground border-2 border-buttonborder px-8 py-4 hover:bg-primary-foreground hover:text-primary transition-all">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      {packageData.itinerary && (
        <section className="max-w-[120rem] mx-auto px-6 py-16">
          <div className="bg-secondary p-12">
            <h2 className="font-paragraph text-4xl uppercase text-secondary-foreground mb-8">
              Itinerary
            </h2>
            <div className="font-paragraph text-base text-secondary-foreground/80 whitespace-pre-line leading-relaxed">
              {packageData.itinerary}
            </div>
          </div>
        </section>
      )}

      {/* Inclusions Section */}
      {packageData.inclusions && (
        <section className="max-w-[120rem] mx-auto px-6 py-16">
          <h2 className="font-paragraph text-4xl uppercase text-primary-foreground mb-8">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packageData.inclusions.split('\n').filter(item => item.trim()).map((inclusion, index) => (
              <div key={index} className="flex items-start gap-4 bg-secondary p-6">
                <div className="w-2 h-2 bg-linktext rounded-full mt-2 flex-shrink-0" />
                <p className="font-paragraph text-base text-secondary-foreground">
                  {inclusion.trim()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-24">
        <div className="text-center bg-secondary p-16">
          <h2 className="font-paragraph text-4xl md:text-5xl uppercase text-secondary-foreground mb-6">
            Ready to Experience This?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
            Get in touch with us to customize this package or book your adventure today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="font-heading text-xl text-primary-foreground border-2 border-buttonborder px-10 py-4 hover:bg-primary-foreground hover:text-primary transition-all">
              Contact Us
            </button>
            <Link 
              to="/packages"
              className="font-paragraph text-lg uppercase text-linktext border-2 border-linktext px-10 py-4 hover:bg-linktext hover:text-white transition-all inline-flex items-center justify-center"
            >
              View More Packages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
