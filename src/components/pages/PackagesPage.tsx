import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PackagesPage() {
  const [packages, setPackages] = useState<HolidayPackages[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<HolidayPackages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroupType, setSelectedGroupType] = useState<string>('all');
  const [selectedHolidayStyle, setSelectedHolidayStyle] = useState<string>('all');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
        setPackages(items);
        setFilteredPackages(items);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    let filtered = packages;

    if (selectedGroupType !== 'all') {
      filtered = filtered.filter(pkg => 
        pkg.groupType?.toLowerCase() === selectedGroupType.toLowerCase()
      );
    }

    if (selectedHolidayStyle !== 'all') {
      filtered = filtered.filter(pkg => 
        pkg.holidayStyle?.toLowerCase() === selectedHolidayStyle.toLowerCase()
      );
    }

    setFilteredPackages(filtered);
  }, [selectedGroupType, selectedHolidayStyle, packages]);

  const groupTypes = ['all', ...Array.from(new Set(packages.map(pkg => pkg.groupType).filter(Boolean)))];
  const holidayStyles = ['all', ...Array.from(new Set(packages.map(pkg => pkg.holidayStyle).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto pt-32 pb-16 px-6">
        <div className="text-center">
          <h1 className="font-paragraph text-6xl md:text-8xl uppercase text-primary-foreground mb-6">
            Holiday Packages
          </h1>
          <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
            Discover your perfect Bali adventure tailored for your group
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-8">
        <div className="bg-secondary p-8">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-secondary-foreground" />
            <h2 className="font-paragraph text-xl uppercase text-secondary-foreground">
              Filter Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Group Type Filter */}
            <div>
              <label className="font-paragraph text-sm uppercase text-secondary-foreground/70 mb-3 block">
                Group Type
              </label>
              <div className="flex flex-wrap gap-3">
                {groupTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedGroupType(type)}
                    className={`font-paragraph text-sm uppercase px-6 py-3 border-2 transition-all ${
                      selectedGroupType === type
                        ? 'bg-linktext text-white border-linktext'
                        : 'bg-transparent text-secondary-foreground border-buttonborder hover:border-linktext'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Holiday Style Filter */}
            <div>
              <label className="font-paragraph text-sm uppercase text-secondary-foreground/70 mb-3 block">
                Holiday Style
              </label>
              <div className="flex flex-wrap gap-3">
                {holidayStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedHolidayStyle(style)}
                    className={`font-paragraph text-sm uppercase px-6 py-3 border-2 transition-all ${
                      selectedHolidayStyle === style
                        ? 'bg-linktext text-white border-linktext'
                        : 'bg-transparent text-secondary-foreground border-buttonborder hover:border-linktext'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(selectedGroupType !== 'all' || selectedHolidayStyle !== 'all') && (
            <div className="mt-6">
              <Button
                onClick={() => {
                  setSelectedGroupType('all');
                  setSelectedHolidayStyle('all');
                }}
                variant="outline"
                className="font-paragraph text-sm uppercase"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-[120rem] mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-secondary h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-xl text-foreground">
              No packages match your filters. Try adjusting your selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Link 
                key={pkg._id} 
                to={`/packages/${pkg._id}`}
                className="group bg-secondary overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image 
                    src={pkg.mainImage || 'https://static.wixstatic.com/media/b57044_ad5516bedcfd4565bb152a220c73d386~mv2.png?originWidth=384&originHeight=256'}
                    alt={pkg.packageName || 'Holiday package'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {pkg.groupType && (
                      <span className="font-paragraph text-xs uppercase px-3 py-1 bg-linktext/10 text-linktext">
                        {pkg.groupType}
                      </span>
                    )}
                    {pkg.holidayStyle && (
                      <span className="font-paragraph text-xs uppercase px-3 py-1 bg-linktext/10 text-linktext">
                        {pkg.holidayStyle}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-paragraph text-2xl uppercase text-secondary-foreground">
                      {pkg.packageName}
                    </h3>
                    <ArrowRight className="w-6 h-6 text-linktext group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="font-paragraph text-base text-secondary-foreground/70 mb-4 line-clamp-2">
                    {pkg.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-sm uppercase text-linktext">
                      {pkg.duration}
                    </span>
                    <span className="font-paragraph text-xl text-secondary-foreground">
                      ${pkg.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
