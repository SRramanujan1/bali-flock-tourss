import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Trash2, Eye, Download, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { Quotes } from '@/entities';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface QuoteWithCustomization extends Quotes {
  customization?: any;
}

function MyQuotesContent() {
  const { member } = useMember();
  const [quotes, setQuotes] = useState<QuoteWithCustomization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteWithCustomization | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!member?.loginEmail) return;

      try {
        const { items } = await BaseCrudService.getAll<Quotes>('quotes');
        const userQuotes = items
          .filter((q) => q.userEmail === member.loginEmail)
          .map((q) => ({
            ...q,
            customization: q.customizationDetails ? JSON.parse(q.customizationDetails) : null,
          }))
          .sort((a, b) => {
            const dateA = new Date(a._createdDate || 0).getTime();
            const dateB = new Date(b._createdDate || 0).getTime();
            return dateB - dateA;
          });

        setQuotes(userQuotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [member?.loginEmail]);

  const handleDeleteQuote = async (quoteId: string) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;

    setDeleting(quoteId);
    try {
      await BaseCrudService.delete('quotes', quoteId);
      setQuotes((prev) => prev.filter((q) => q._id !== quoteId));
      setSelectedQuote(null);
    } catch (error) {
      console.error('Error deleting quote:', error);
      alert('Failed to delete quote. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownloadQuote = (quote: QuoteWithCustomization) => {
    const customization = quote.customization || {};
    const quoteText = `CUSTOM HOLIDAY PACKAGE QUOTE
=====================================

Quote ID: ${quote._id}
Package: ${quote.packageName}
Created: ${new Date(quote._createdDate || '').toLocaleDateString()}
Expires: ${new Date(quote.expirationDate || '').toLocaleDateString()}
Status: ${quote.quoteStatus}

CUSTOMIZATION DETAILS
Number of People: ${customization.numberOfPeople || 'N/A'}
Dates: ${customization.dates || 'To be confirmed'}
Accommodation: ${customization.accommodation || 'To be confirmed'}
Flights: ${customization.flights || 'To be confirmed'}

SELECTED ACTIVITIES
${customization.selectedActivities?.length > 0 ? customization.selectedActivities.join('\n') : 'None selected'}

${customization.dietaryRestrictions ? `\nDietary Restrictions:\n${customization.dietaryRestrictions}` : ''}
${customization.specialRequests ? `\nSpecial Requests:\n${customization.specialRequests}` : ''}

This quote is valid until ${new Date(quote.expirationDate || '').toLocaleDateString()}`;

    const element = document.createElement('a');
    const file = new Blob([quoteText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `quote-${quote.packageName?.replace(/\s+/g, '-')}-${quote._id.slice(0, 8)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isQuoteExpired = (expirationDate: Date | undefined) => {
    if (!expirationDate) return false;
    return new Date() > new Date(expirationDate);
  };

  const activeQuotes = quotes.filter((q) => !isQuoteExpired(q.expirationDate));
  const expiredQuotes = quotes.filter((q) => isQuoteExpired(q.expirationDate));

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-cardbackground rounded-xl"></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="max-w-[100rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">My Quotes</h1>
          <p className="text-lg text-muted">
            View and manage your saved custom package quotes. Quotes are valid for 2 months from creation.
          </p>
        </motion.div>

        {quotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <AlertCircle size={64} className="mx-auto text-muted mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No quotes yet</h2>
            <p className="text-muted mb-8">
              Start customizing a package to create your first quote!
            </p>
            <Link to="/packages">
              <Button className="bg-primary hover:bg-primary-dark text-white font-bold py-3">
                Browse Packages
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {/* Active Quotes */}
            {activeQuotes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Active Quotes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeQuotes.map((quote, index) => (
                    <motion.div
                      key={quote._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-2 border-success/20 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {quote.packageName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted mb-2">
                          <Calendar size={16} />
                          Created: {new Date(quote._createdDate || '').toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Calendar size={16} />
                          Expires: {new Date(quote.expirationDate || '').toLocaleDateString()}
                        </div>
                      </div>

                      {quote.customization && (
                        <div className="bg-cardbackground rounded-lg p-4 mb-4 text-sm">
                          <p className="text-foreground">
                            <span className="font-semibold">People:</span> {quote.customization.numberOfPeople}
                          </p>
                          {quote.customization.selectedActivities?.length > 0 && (
                            <p className="text-foreground mt-2">
                              <span className="font-semibold">Activities:</span>{' '}
                              {quote.customization.selectedActivities.length}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedQuote(quote)}
                          variant="outline"
                          className="flex-1 text-sm"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDownloadQuote(quote)}
                          variant="outline"
                          className="flex-1 text-sm"
                        >
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button
                          onClick={() => handleDeleteQuote(quote._id)}
                          disabled={deleting === quote._id}
                          variant="outline"
                          className="flex-1 text-sm text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Expired Quotes */}
            {expiredQuotes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Expired Quotes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {expiredQuotes.map((quote, index) => (
                    <motion.div
                      key={quote._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-2 border-destructive/20 rounded-xl p-6 opacity-60"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {quote.packageName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-destructive font-semibold">
                          <AlertCircle size={16} />
                          Expired on {new Date(quote.expirationDate || '').toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedQuote(quote)}
                          variant="outline"
                          className="flex-1 text-sm"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDeleteQuote(quote._id)}
                          disabled={deleting === quote._id}
                          variant="outline"
                          className="flex-1 text-sm text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQuote(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">{selectedQuote.packageName}</h2>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-muted hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase mb-1">Quote ID</h3>
                  <p className="text-foreground font-mono text-sm">{selectedQuote._id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase mb-1">Status</h3>
                  <p className="text-foreground font-semibold">
                    {isQuoteExpired(selectedQuote.expirationDate) ? 'Expired' : 'Active'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase mb-1">Created</h3>
                  <p className="text-foreground">
                    {new Date(selectedQuote._createdDate || '').toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase mb-1">Expires</h3>
                  <p className="text-foreground">
                    {new Date(selectedQuote.expirationDate || '').toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedQuote.customization && (
                <div className="bg-cardbackground rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-4">Customization Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-foreground">Number of People:</span>
                      <span className="text-muted ml-2">{selectedQuote.customization.numberOfPeople}</span>
                    </div>
                    {selectedQuote.customization.dates && (
                      <div>
                        <span className="font-semibold text-foreground">Dates:</span>
                        <span className="text-muted ml-2">{selectedQuote.customization.dates}</span>
                      </div>
                    )}
                    {selectedQuote.customization.accommodation && (
                      <div>
                        <span className="font-semibold text-foreground">Accommodation:</span>
                        <span className="text-muted ml-2">{selectedQuote.customization.accommodation}</span>
                      </div>
                    )}
                    {selectedQuote.customization.flights && (
                      <div>
                        <span className="font-semibold text-foreground">Flights:</span>
                        <span className="text-muted ml-2">{selectedQuote.customization.flights}</span>
                      </div>
                    )}
                    {selectedQuote.customization.selectedActivities?.length > 0 && (
                      <div>
                        <span className="font-semibold text-foreground">Activities:</span>
                        <span className="text-muted ml-2">
                          {selectedQuote.customization.selectedActivities.length} selected
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(selectedQuote.dietaryRestrictions || selectedQuote.specialRequests) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-4">Fine Print</h3>
                  <div className="space-y-3 text-sm">
                    {selectedQuote.dietaryRestrictions && (
                      <div>
                        <span className="font-semibold text-foreground">Dietary Restrictions:</span>
                        <p className="text-muted mt-1 whitespace-pre-wrap">
                          {selectedQuote.dietaryRestrictions}
                        </p>
                      </div>
                    )}
                    {selectedQuote.specialRequests && (
                      <div>
                        <span className="font-semibold text-foreground">Special Requests:</span>
                        <p className="text-muted mt-1 whitespace-pre-wrap">
                          {selectedQuote.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => handleDownloadQuote(selectedQuote)}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3"
              >
                <Download size={18} className="mr-2" />
                Download
              </Button>
              <Button
                onClick={() => setSelectedQuote(null)}
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

export default function MyQuotesPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to view your saved quotes">
      <MyQuotesContent />
    </MemberProtectedRoute>
  );
}
