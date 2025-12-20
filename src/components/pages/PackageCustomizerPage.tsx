import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Download, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { HolidayPackages, Activities, CustomPackageQuotes, Bookings } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCurrencyStore, convertPrice, formatPrice } from '@/store/currencyStore';
import { useBookingStore } from '@/store/currencyStore';

interface CustomizationState {
  numberOfPeople: number;
  dates: string;
  accommodation: string;
  flights: string;
  selectedActivities: string[];
  dietaryRestrictions: string;
  specialRequests: string;
}

const ACTIVITY_CATEGORIES = ['outdoors', 'watersport', 'indoors', 'nightlife', 'explore'];

export default function PackageCustomizerPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { member, isAuthenticated } = useMember();
  const { selectedCurrency } = useCurrencyStore();
  
  const [pkg, setPkg] = useState<HolidayPackages | null>(null);
  const [activities, setActivities] = useState<Activities[]>([]);
  const [loading, setLoading] = useState(true);
  const [customization, setCustomization] = useState<CustomizationState>({
    numberOfPeople: parseInt(searchParams.get('people') || '1'),
    dates: searchParams.get('dates') || '',
    accommodation: searchParams.get('accommodation') || '',
    flights: searchParams.get('flights') || '',
    selectedActivities: [],
    dietaryRestrictions: '',
    specialRequests: '',
  });
  
  const [showQuote, setShowQuote] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [quoteSaved, setQuoteSaved] = useState(false);
  const [savingQuote, setSavingQuote] = useState(false);
  const { confirmBooking } = useBookingStore();
  const [bookingInProgress, setBookingInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [packageData, activitiesData] = await Promise.all([
          BaseCrudService.getById<HolidayPackages>('holidaypackages', id),
          BaseCrudService.getAll<Activities>('activities'),
        ]);
        setPkg(packageData);
        setActivities(activitiesData.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleActivityToggle = (activityId: string) => {
    setCustomization((prev) => ({
      ...prev,
      selectedActivities: prev.selectedActivities.includes(activityId)
        ? prev.selectedActivities.filter((id) => id !== activityId)
        : [...prev.selectedActivities, activityId],
    }));
  };

  const selectedActivityObjects = activities.filter((a) =>
    customization.selectedActivities.includes(a._id)
  );

  const basePrice = (pkg?.price || 0) * customization.numberOfPeople;
  const activitiesPrice = selectedActivityObjects.reduce(
    (sum, activity) => sum + (activity.pricePerPerson || 0) * customization.numberOfPeople,
    0
  );
  const totalPrice = basePrice + activitiesPrice;

  const basePriceConverted = convertPrice(basePrice, selectedCurrency);
  const activitiesPriceConverted = convertPrice(activitiesPrice, selectedCurrency);
  const totalPriceConverted = convertPrice(totalPrice, selectedCurrency);

  const generateItinerary = () => {
    const baseItinerary = pkg?.itinerary || '';
    if (selectedActivityObjects.length === 0) {
      return baseItinerary;
    }

    const activitiesList = selectedActivityObjects
      .map((a) => `• ${a.name} (${a.location || 'TBD'})`)
      .join('\n');

    return `${baseItinerary}\n\nCustom Activities:\n${activitiesList}`;
  };

  const generateQuoteText = () => {
    const itinerary = generateItinerary();
    let quoteText = `CUSTOM HOLIDAY PACKAGE QUOTE
=====================================

Package: ${pkg?.packageName}
Number of People: ${customization.numberOfPeople}
Dates: ${customization.dates || 'To be confirmed'}
Accommodation: ${customization.accommodation || 'To be confirmed'}
Flights: ${customization.flights || 'To be confirmed'}
Currency: ${selectedCurrency}

BASE PACKAGE PRICE: ${formatPrice(basePriceConverted, selectedCurrency)}

SELECTED ACTIVITIES:
${selectedActivityObjects.map((a) => `• ${a.name} - ${formatPrice(convertPrice((a.pricePerPerson || 0) * customization.numberOfPeople, selectedCurrency), selectedCurrency)} (${customization.numberOfPeople} people × ${formatPrice(convertPrice(a.pricePerPerson || 0, selectedCurrency), selectedCurrency)})`).join('\n')}

ACTIVITIES SUBTOTAL: ${formatPrice(activitiesPriceConverted, selectedCurrency)}

TOTAL QUOTE: ${formatPrice(totalPriceConverted, selectedCurrency)}

CUSTOM ITINERARY:
${itinerary}`;

    // Add fine print with dietary restrictions and special requests
    if (customization.dietaryRestrictions || customization.specialRequests) {
      quoteText += '\n\nFINE PRINT:';
      if (customization.dietaryRestrictions) {
        quoteText += `\nDietary Restrictions: ${customization.dietaryRestrictions}`;
      }
      if (customization.specialRequests) {
        quoteText += `\nSpecial Requests: ${customization.specialRequests}`;
      }
    }

    quoteText += `\n\nGenerated on: ${new Date().toLocaleDateString()}`;
    return quoteText;
  };

  const handleSaveQuote = async () => {
    if (!isAuthenticated || !member?.loginEmail) {
      alert('Please sign in to save quotes');
      return;
    }

    setSavingQuote(true);
    try {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 2);

      const quote: CustomPackageQuotes & { customizationDetails: string } = {
        _id: crypto.randomUUID(),
        packageId: id || '',
        packageName: pkg?.packageName || '',
        userEmail: member.loginEmail,
        dietaryRestrictions: customization.dietaryRestrictions,
        specialRequests: customization.specialRequests,
        expirationDate,
        quoteStatus: 'active',
        customizationDetails: JSON.stringify(customization),
      };

      await BaseCrudService.create('quotes', quote);
      setQuoteSaved(true);
      setTimeout(() => setQuoteSaved(false), 3000);
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Failed to save quote. Please try again.');
    } finally {
      setSavingQuote(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailInput) {
      alert('Please enter an email address');
      return;
    }

    try {
      const quoteText = generateQuoteText();
      // In a real implementation, this would call a backend API to send email with PDF
      // For now, we'll just show a success message
      console.log('Sending quote to:', emailInput);
      console.log('Quote content:', quoteText);
      
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  const handleDownloadQuote = () => {
    const quoteText = generateQuoteText();
    const element = document.createElement('a');
    const file = new Blob([quoteText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `quote-${pkg?.packageName?.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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

  const activitiesByCategory = ACTIVITY_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = activities.filter((a) => a.category === category);
      return acc;
    },
    {} as Record<string, Activities[]>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Button */}
      <div className="max-w-[100rem] mx-auto px-6 pt-8">
        <Link
          to={`/packages/${id}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Package
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Customize Your {pkg.packageName}
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            Select activities and customize your package to create the perfect holiday experience.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-[100rem] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Activities Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Trip Details */}
            <div className="bg-cardbackground rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Number of People
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={customization.numberOfPeople}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        numberOfPeople: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Dates
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Dec 20 - Dec 27, 2025"
                    value={customization.dates}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        dates: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Accommodation
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 4-star hotel"
                    value={customization.accommodation}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        accommodation: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Flights
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Round-trip from NYC"
                    value={customization.flights}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        flights: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Dietary Restrictions & Special Requests */}
            <div className="bg-cardbackground rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Dietary Restrictions
                  </label>
                  <Textarea
                    placeholder="e.g., Vegetarian, Gluten-free, Nut allergies..."
                    value={customization.dietaryRestrictions}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        dietaryRestrictions: e.target.value,
                      }))
                    }
                    className="w-full min-h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Special Requests
                  </label>
                  <Textarea
                    placeholder="e.g., Honeymoon suite, Early check-in, Photography services..."
                    value={customization.specialRequests}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        specialRequests: e.target.value,
                      }))
                    }
                    className="w-full min-h-24"
                  />
                </div>
              </div>
            </div>

            {/* Activities Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Select Activities</h2>
              {ACTIVITY_CATEGORIES.map((category) => {
                const categoryActivities = activitiesByCategory[category];
                if (categoryActivities.length === 0) return null;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-cardbackground rounded-xl p-8"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6 capitalize">
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {categoryActivities.map((activity) => (
                        <motion.div
                          key={activity._id}
                          className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-white/50 transition-colors"
                        >
                          <Checkbox
                            id={activity._id}
                            checked={customization.selectedActivities.includes(activity._id)}
                            onCheckedChange={() => handleActivityToggle(activity._id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={activity._id}
                              className="block font-semibold text-foreground cursor-pointer"
                            >
                              {activity.name}
                            </label>
                            <p className="text-sm text-muted mt-1">{activity.description}</p>
                            {activity.location && (
                              <p className="text-xs text-muted-foreground mt-2">
                                📍 {activity.location}
                              </p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-primary">
                              ${activity.pricePerPerson}
                            </p>
                            <p className="text-xs text-muted">per person</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quote Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white shadow-2xl space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quote Summary</h3>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-6 border-b border-white/20">
                <div className="flex justify-between text-sm">
                  <span>Base Package:</span>
                  <span>{formatPrice(basePriceConverted, selectedCurrency)}</span>
                </div>
                {selectedActivityObjects.length > 0 && (
                  <>
                    <div className="text-xs text-white/70 mt-2">
                      Selected Activities:
                    </div>
                    {selectedActivityObjects.map((activity) => (
                      <div key={activity._id} className="flex justify-between text-xs text-white/90">
                        <span>{activity.name}:</span>
                        <span>
                          {formatPrice(convertPrice((activity.pricePerPerson || 0) * customization.numberOfPeople, selectedCurrency), selectedCurrency)}
                        </span>
                      </div>
                    ))}
                  </>
                )}
                {activitiesPrice > 0 && (
                  <div className="flex justify-between text-sm pt-2">
                    <span>Activities Subtotal:</span>
                    <span>{formatPrice(activitiesPriceConverted, selectedCurrency)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Quote:</span>
                  <span className="text-3xl font-bold">{formatPrice(totalPriceConverted, selectedCurrency)}</span>
                </div>
                <p className="text-xs text-white/70">
                  For {customization.numberOfPeople} {customization.numberOfPeople === 1 ? 'person' : 'people'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6">
                <Button
                  onClick={() => setShowQuote(true)}
                  className="w-full bg-white text-primary hover:bg-gray-100 font-bold py-3"
                >
                  View Full Quote
                </Button>
                <Button
                  onClick={handleDownloadQuote}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10 font-bold py-3"
                >
                  <Download size={18} className="mr-2" />
                  Download Quote
                </Button>
              </div>

              {/* Save Quote Section */}
              {isAuthenticated && (
                <div className="space-y-3 pt-6 border-t border-white/20">
                  <Button
                    onClick={handleSaveQuote}
                    disabled={savingQuote}
                    className="w-full bg-white text-primary hover:bg-gray-100 font-bold py-3"
                  >
                    <Save size={18} className="mr-2" />
                    {savingQuote ? 'Saving...' : 'Save Quote'}
                  </Button>
                  {quoteSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-success bg-white/20 p-3 rounded-lg text-sm"
                    >
                      <CheckCircle2 size={16} />
                      Quote saved! Valid for 2 months
                    </motion.div>
                  )}
                </div>
              )}

              {/* Email Section */}
              <div className="space-y-3 pt-6 border-t border-white/20">
                <label className="block text-sm font-semibold">Send Quote via Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                />
                <Button
                  onClick={handleSendEmail}
                  className="w-full bg-white text-primary hover:bg-gray-100 font-bold py-3"
                >
                  <Mail size={18} className="mr-2" />
                  Send Quote
                </Button>
                {emailSent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-success bg-white/20 p-3 rounded-lg text-sm"
                  >
                    <CheckCircle2 size={16} />
                    Quote sent successfully!
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Quote Modal */}
      {showQuote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuote(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Quote Details</h2>
              <button
                onClick={() => setShowQuote(false)}
                className="text-muted hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-foreground whitespace-pre-wrap font-mono text-sm bg-cardbackground p-6 rounded-lg">
              {generateQuoteText()}
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleDownloadQuote}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3"
              >
                <Download size={18} className="mr-2" />
                Download
              </Button>
              <Button
                onClick={() => setShowQuote(false)}
                variant="outline"
                className="flex-1 font-bold py-3"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
