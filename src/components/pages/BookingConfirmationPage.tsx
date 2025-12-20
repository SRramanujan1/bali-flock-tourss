import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Mail, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Bookings } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/store/currencyStore';

interface BookingWithCustomization extends Bookings {
  customizationDetails?: string;
}

export default function BookingConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState<BookingWithCustomization | null>(null);
  const [loading, setLoading] = useState(true);
  const { confirmBooking } = useBookingStore();

  const bookingId = searchParams.get('id');
  const packageId = searchParams.get('packageId');

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }

      try {
        const bookingData = await BaseCrudService.getById<BookingWithCustomization>('bookings', bookingId);
        setBooking(bookingData);
        
        // Mark the package booking as confirmed
        if (packageId) {
          confirmBooking(packageId);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, packageId, confirmBooking]);

  const handleDownloadConfirmation = () => {
    if (!booking) return;

    const confirmationText = `BOOKING CONFIRMATION
=====================================

Booking Reference: ${booking.bookingReference}
Booking Date: ${new Date(booking.bookingDate || '').toLocaleDateString()}

TRAVELER INFORMATION
Email: ${booking.travelerEmail}

PACKAGE DETAILS
Package: ${booking.packageDisplayName}
Total Amount: ${booking.currency} ${booking.totalAmount?.toFixed(2)}
Payment Status: ${booking.paymentStatus}
Booking Status: ${booking.bookingStatus}

CUSTOMIZATION DETAILS
${booking.customizationDetails ? JSON.stringify(JSON.parse(booking.customizationDetails), null, 2) : 'No customization details'}

${booking.dietaryRestrictions ? `\nDietary Restrictions:\n${booking.dietaryRestrictions}` : ''}
${booking.specialRequests ? `\nSpecial Requests:\n${booking.specialRequests}` : ''}

IMPORTANT INFORMATION
- This booking confirmation has been sent to your email
- Please keep this reference number for your records
- Contact us with any questions or changes

Thank you for booking with us!`;

    const element = document.createElement('a');
    const file = new Blob([confirmationText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `booking-confirmation-${booking.bookingReference}.txt`;
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Booking not found</h1>
          <p className="text-muted mb-8">We couldn't find the booking you're looking for.</p>
          <Link to="/packages" className="text-primary hover:text-primary-dark font-semibold">
            Back to Packages
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 to-secondary/5">
      <Header />

      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center">
              <CheckCircle2 size={56} className="text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl font-bold text-foreground mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Your holiday package has been successfully booked. A confirmation email has been sent to{' '}
            <span className="font-semibold text-foreground">{booking.travelerEmail}</span>
          </p>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Reference Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-success/20">
            <h3 className="text-sm font-semibold text-muted uppercase mb-2">Booking Reference</h3>
            <p className="text-3xl font-bold text-foreground mb-4">{booking.bookingReference}</p>
            <p className="text-sm text-muted">Keep this number for your records</p>
          </div>

          {/* Package Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-sm font-semibold text-muted uppercase mb-2">Package</h3>
            <p className="text-2xl font-bold text-foreground mb-4">{booking.packageDisplayName}</p>
            <p className="text-sm text-muted">Customized holiday experience</p>
          </div>

          {/* Total Card */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 shadow-lg text-white">
            <h3 className="text-sm font-semibold text-white/80 uppercase mb-2">Total Amount</h3>
            <p className="text-3xl font-bold mb-4">
              {booking.currency} {booking.totalAmount?.toFixed(2)}
            </p>
            <p className="text-sm text-white/70">Payment: {booking.paymentStatus}</p>
          </div>
        </motion.div>

        {/* Booking Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-xl p-8 shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Booking Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Booking Date</h3>
              <p className="text-lg text-foreground">
                {new Date(booking.bookingDate || '').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Booking Status</h3>
              <p className="text-lg text-foreground font-semibold">{booking.bookingStatus}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Traveler Email</h3>
              <p className="text-lg text-foreground">{booking.travelerEmail}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted uppercase mb-2">Payment Status</h3>
              <p className="text-lg text-foreground font-semibold">{booking.paymentStatus}</p>
            </div>
          </div>

          {/* Customization Details */}
          {booking.customizationDetails && (
            <div className="border-t pt-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Customization Details</h3>
              <div className="bg-cardbackground rounded-lg p-6">
                <pre className="text-sm text-foreground overflow-x-auto">
                  {JSON.stringify(JSON.parse(booking.customizationDetails), null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Dietary & Special Requests */}
          {(booking.dietaryRestrictions || booking.specialRequests) && (
            <div className="border-t pt-8 mt-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Fine Print</h3>
              <div className="space-y-4">
                {booking.dietaryRestrictions && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Dietary Restrictions</h4>
                    <p className="text-muted whitespace-pre-wrap">{booking.dietaryRestrictions}</p>
                  </div>
                )}
                {booking.specialRequests && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Special Requests</h4>
                    <p className="text-muted whitespace-pre-wrap">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Button
            onClick={handleDownloadConfirmation}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-4 h-auto"
          >
            <Download size={20} className="mr-2" />
            Download Confirmation
          </Button>

          <Button
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 h-auto"
          >
            <Mail size={20} className="mr-2" />
            Resend Confirmation
          </Button>

          <Link to="/packages">
            <Button
              variant="outline"
              className="w-full font-bold py-4 h-auto"
            >
              Continue Shopping
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-8"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">What's Next?</h3>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Check your email for the booking confirmation and itinerary details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>Review your customization details and special requests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Our team will contact you within 24 hours to confirm final details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>Complete payment to finalize your booking</span>
            </li>
          </ul>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
