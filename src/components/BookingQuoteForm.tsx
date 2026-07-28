import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plane, Hotel, Calendar, Shield, UserCheck, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FEES, ADD_ONS } from './PACKAGES_DATA';

// ============================================================
// BALI FLOCK TOURS — BOOKING QUOTE FORM
// Paste this component into your PackageDetailPage or 
// PackageCustomizerPage to replace the existing form.
// ============================================================

interface BookingQuoteFormProps {
  packageName: string;
  packageId: string;
  basePrice: number; // per person in NZD
  onSubmit?: (data: QuoteFormData) => void;
}

export interface QuoteFormData {
  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  // Trip details
  numberOfPeople: number;
  arrivalDate: string;
  departureDate: string;
  // Options
  flightsIncluded: boolean | null;
  accommodationType: string;
  accommodationTier: string;
  securityRequired: boolean | null;
  tourGuideRequired: boolean | null;
  // Children (family package)
  hasChildren: boolean;
  numberOfChildren: number;
  childCareDates: string;
  // Add-ons
  selectedAddOns: string[];
  // Notes
  specialRequests: string;
  dietaryRestrictions: string;
  // Calculated
  baliEntryFeeTotal: number;
  estimatedTotal: number;
}

const STEPS = [
  { id: 1, label: 'Contact', icon: Users },
  { id: 2, label: 'Trip Details', icon: Calendar },
  { id: 3, label: 'Options', icon: Hotel },
  { id: 4, label: 'Add-Ons', icon: Shield },
  { id: 5, label: 'Review', icon: CheckCircle2 },
];

const NOTIFICATION_EMAIL = 'raghavaggarwal2005@gmail.com';

export default function BookingQuoteForm({ packageName, packageId, basePrice, onSubmit }: BookingQuoteFormProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'New Zealand',
    numberOfPeople: 2,
    arrivalDate: '',
    departureDate: '',
    flightsIncluded: null,
    accommodationType: '',
    accommodationTier: '',
    securityRequired: null,
    tourGuideRequired: null,
    hasChildren: false,
    numberOfChildren: 0,
    childCareDates: '',
    selectedAddOns: [],
    specialRequests: '',
    dietaryRestrictions: '',
    baliEntryFeeTotal: FEES.baliEntryFee * 2,
    estimatedTotal: 0,
  });

  const update = (field: keyof QuoteFormData, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      // Recalculate entry fee when people count changes
      if (field === 'numberOfPeople') {
        updated.baliEntryFeeTotal = FEES.baliEntryFee * value;
      }
      return updated;
    });
  };

  const isLargeGroup = form.numberOfPeople >= 20;
  const isFamilyPackage = packageName?.toLowerCase().includes('family');

  const generateEmailBody = () => {
    const addOnDetails = form.selectedAddOns.map(id => {
      const addOn = ADD_ONS.find(a => a.id === id);
      return addOn ? `  - ${addOn.name}` : '';
    }).join('\n');

    return `
NEW BOOKING QUOTE REQUEST — BALI FLOCK TOURS
============================================

PACKAGE: ${packageName}
Package ID: ${packageId}

CONTACT DETAILS
---------------
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
Country: ${form.country}

TRIP DETAILS
------------
Number of People: ${form.numberOfPeople}
Arrival Date: ${form.arrivalDate || 'TBC'}
Departure Date: ${form.departureDate || 'TBC'}
Flights Included: ${form.flightsIncluded === true ? 'YES — needs flights arranged' : form.flightsIncluded === false ? 'NO — self-arranged' : 'Not specified'}

ACCOMMODATION
-------------
Type: ${form.accommodationType || 'Not specified'}
Tier: ${form.accommodationTier || 'Not specified'}
Note: ${isLargeGroup ? 'Large group (20+) — Windom Hotel' : 'Small group (under 20) — Villa/Airbnb'}

OPTIONAL SERVICES
-----------------
Security (NZ Licensed): ${form.securityRequired === true ? 'YES REQUESTED' : form.securityRequired === false ? 'No' : 'Not specified'}
NZ Tour Guide: ${form.tourGuideRequired === true ? 'YES REQUESTED' : form.tourGuideRequired === false ? 'No' : 'Not specified'}

${isFamilyPackage && form.hasChildren ? `CHILDREN
--------
Number of Children: ${form.numberOfChildren}
Child Care Dates/Hours: ${form.childCareDates}

` : ''}ADD-ONS REQUESTED
-----------------
${form.selectedAddOns.length > 0 ? addOnDetails : 'None'}

FEES TO INCLUDE IN QUOTE
-------------------------
Bali Entry Fee (visa + levy): $${FEES.baliEntryFee} NZD x ${form.numberOfPeople} people = $${form.baliEntryFeeTotal} NZD
Deposit Required: $${FEES.depositPerPerson} NZD per person (non-refundable, non-transferable)
Full Payment Due: 6 weeks before departure

ADDITIONAL NOTES
----------------
Dietary Restrictions: ${form.dietaryRestrictions || 'None'}
Special Requests: ${form.specialRequests || 'None'}

============================================
Submitted: ${new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}
Reply to: ${form.email}
============================================
    `.trim();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      // Send email via Wix Email API
      // This uses Wix's built-in triggered emails or you can use fetch to a Wix backend function
      // Replace the URL below with your Wix backend function URL once set up
      
      const emailBody = generateEmailBody();

      // Option 1: Use Wix HTTP Functions (recommended)
      // Create a file at backend/sendQuoteEmail.web.js and point to it here
      // const response = await fetch('/_functions/sendQuoteEmail', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: NOTIFICATION_EMAIL,
      //     replyTo: form.email,
      //     subject: `New Quote Request: ${packageName} — ${form.firstName} ${form.lastName} (${form.numberOfPeople} people)`,
      //     body: emailBody,
      //   }),
      // });

      // Option 2: Use Wix CMS to save the quote (works RIGHT NOW without backend setup)
      // The quote will appear in your Wix CMS dashboard under "quotes" collection
      const quoteRecord = {
        _id: crypto.randomUUID(),
        packageId,
        packageName,
        contactName: `${form.firstName} ${form.lastName}`,
        contactEmail: form.email,
        contactPhone: form.phone,
        contactCountry: form.country,
        numberOfPeople: form.numberOfPeople,
        arrivalDate: form.arrivalDate,
        departureDate: form.departureDate,
        flightsIncluded: form.flightsIncluded,
        accommodationType: form.accommodationType,
        securityRequired: form.securityRequired,
        tourGuideRequired: form.tourGuideRequired,
        selectedAddOns: JSON.stringify(form.selectedAddOns),
        specialRequests: form.specialRequests,
        dietaryRestrictions: form.dietaryRestrictions,
        baliEntryFeeTotal: form.baliEntryFeeTotal,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        emailBody, // Full email body for you to copy/forward
      };

      // Import BaseCrudService at the top of your file:
      // import { BaseCrudService } from '@/integrations';
      // Then uncomment:
      // await BaseCrudService.create('quotes', quoteRecord);

      // For now, log to console so you can see it working
      console.log('QUOTE SUBMITTED:', quoteRecord);
      console.log('\nEMAIL TO SEND:\n', emailBody);

      setSubmitted(true);
      if (onSubmit) onSubmit(form);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError('Something went wrong. Please try again or email us directly at ' + NOTIFICATION_EMAIL);
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return form.firstName && form.lastName && form.email && form.phone;
    if (step === 2) return form.numberOfPeople >= 1 && form.arrivalDate;
    if (step === 3) return form.flightsIncluded !== null && form.accommodationType;
    return true;
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-10 text-center shadow-xl border border-green-100"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Quote Request Sent!</h2>
        <p className="text-muted text-lg mb-2">
          Thanks {form.firstName} — we've received your request for the <strong>{packageName}</strong>.
        </p>
        <p className="text-muted mb-6">
          We'll have your personalised quote ready within <strong>24 hours</strong> and send it to <strong>{form.email}</strong>.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-left mb-6">
          <h3 className="font-bold text-amber-900 mb-3">What happens next?</h3>
          <ol className="space-y-2 text-amber-800 text-sm">
            <li className="flex gap-2"><span className="font-bold">1.</span> We review your request and calculate your full quote (including flights & accommodation if selected)</li>
            <li className="flex gap-2"><span className="font-bold">2.</span> We email your personalised quote within 24 hours</li>
            <li className="flex gap-2"><span className="font-bold">3.</span> Reply to confirm — we'll send you a deposit payment link ($1,000 NZD per person)</li>
            <li className="flex gap-2"><span className="font-bold">4.</span> Full payment is due 6 weeks before your departure date</li>
          </ol>
        </div>
        <p className="text-sm text-muted">
          Questions? Email us at <a href={`mailto:${NOTIFICATION_EMAIL}`} className="text-primary font-semibold">{NOTIFICATION_EMAIL}</a>
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">Get Your Free Quote</h2>
        <p className="text-white/80 text-sm">For: {packageName} · Reply within 24 hours</p>
      </div>

      {/* Step Progress */}
      <div className="flex border-b border-border">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div
              key={s.id}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-semibold transition-colors ${
                isActive ? 'text-primary border-b-2 border-primary' :
                isDone ? 'text-green-600' : 'text-muted'
              }`}
            >
              <Icon size={16} className="mb-1" />
              <span className="hidden sm:block">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Form Steps */}
      <div className="p-6">
        <AnimatePresence mode="wait">

          {/* STEP 1 — Contact Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-lg font-bold text-foreground mb-4">Your Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">First Name *</label>
                  <Input value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Last Name *</label>
                  <Input value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Email Address *</label>
                <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@email.com" />
                <p className="text-xs text-muted mt-1">Your quote will be sent here</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Phone Number *</label>
                <Input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+64 21 123 4567" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Country</label>
                <select
                  value={form.country}
                  onChange={e => update('country', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  {['New Zealand', 'Australia', 'United Kingdom', 'United States', 'Canada', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Trip Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="text-lg font-bold text-foreground mb-4">Trip Details</h3>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Number of People *</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => update('numberOfPeople', Math.max(1, form.numberOfPeople - 1))}
                    className="w-10 h-10 rounded-full bg-cardbackground hover:bg-border font-bold text-lg transition-colors"
                  >−</button>
                  <span className="text-2xl font-bold w-12 text-center">{form.numberOfPeople}</span>
                  <button
                    onClick={() => update('numberOfPeople', form.numberOfPeople + 1)}
                    className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 font-bold text-lg transition-colors"
                  >+</button>
                </div>
                {isLargeGroup && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                    <Info size={16} />
                    <span>20+ group — Windom Hotel accommodation applies</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Arrival Date *</label>
                  <Input type="date" value={form.arrivalDate} onChange={e => update('arrivalDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Departure Date</label>
                  <Input type="date" value={form.departureDate} onChange={e => update('departureDate', e.target.value)} />
                </div>
              </div>
              {isFamilyPackage && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasChildren}
                      onChange={e => update('hasChildren', e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="font-semibold text-foreground">Children in the group?</span>
                  </label>
                  {form.hasChildren && (
                    <div className="space-y-3 pl-7">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Number of Children</label>
                        <Input
                          type="number"
                          min={1}
                          value={form.numberOfChildren}
                          onChange={e => update('numberOfChildren', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Preferred child care hours (Day 3)</label>
                        <Input
                          placeholder="e.g. 10am – 6pm"
                          value={form.childCareDates}
                          onChange={e => update('childCareDates', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Bali entry fee notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Bali Entry Fee (included in your quote)</p>
                  <p>$100 NZD per person covers visa + tourism tax levy = <strong>${FEES.baliEntryFee * form.numberOfPeople} NZD total</strong> for {form.numberOfPeople} {form.numberOfPeople === 1 ? 'person' : 'people'}.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Options */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Trip Options</h3>

              {/* Flights */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  <Plane size={16} className="inline mr-2" />
                  Flights *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: 'Yes — arrange flights for me', desc: "We'll include flights in your quote" },
                    { value: false, label: "No — I'll sort my own flights", desc: 'Land package only' },
                  ].map(opt => (
                    <button
                      key={String(opt.value)}
                      onClick={() => update('flightsIncluded', opt.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        form.flightsIncluded === opt.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <p className="font-semibold text-sm text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted mt-1">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  <Hotel size={16} className="inline mr-2" />
                  Accommodation *
                </label>
                <div className="space-y-3">
                  {isLargeGroup ? (
                    <>
                      <p className="text-xs text-muted bg-blue-50 p-3 rounded-lg">20+ group: Windom Hotel options below</p>
                      {[
                        { value: 'windom-ocean', label: 'Windom Hotel — Ocean View', desc: 'Per room, ocean-facing views' },
                        { value: 'windom-back', label: 'Windom Hotel — Back View', desc: 'Per room, garden-facing' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => update('accommodationType', opt.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            form.accommodationType === opt.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted">{opt.desc}</p>
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-muted bg-green-50 p-3 rounded-lg">Under 20 people: Private villa sourced via Booking.com / Airbnb</p>
                      <button
                        onClick={() => update('accommodationType', 'villa')}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          form.accommodationType === 'villa'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <p className="font-semibold text-sm">Private Villa</p>
                        <p className="text-xs text-muted">We'll source the best villa for your group size and budget</p>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Security */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  <Shield size={16} className="inline mr-2" />
                  NZ Licensed Security
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
                  <p className="text-sm text-blue-800">
                    A New Zealand licensed security guard dedicated to your group. Around-the-clock support, keeping your group safe and on schedule with a fun roll-call system.
                  </p>
                  <p className="text-xs text-blue-700 mt-2 font-semibold">$100 NZD/day + $80 NZD accommodation/day + flights + $20 NZD food per diem</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: 'Yes please' },
                    { value: false, label: 'No thanks' },
                  ].map(opt => (
                    <button
                      key={String(opt.value)}
                      onClick={() => update('securityRequired', opt.value)}
                      className={`p-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.securityRequired === opt.value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/40 text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tour Guide */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  <UserCheck size={16} className="inline mr-2" />
                  NZ Tour Guide
                </label>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-3">
                  <p className="text-sm text-purple-800">
                    A NZ-based tour guide who keeps your group on the itinerary with a fun roll-call system — ensuring smooth flow and around-the-clock support throughout your holiday.
                  </p>
                  <p className="text-xs text-purple-700 mt-2 font-semibold">$100 NZD/day + $80 NZD accommodation/day + flights + $20 NZD food per diem</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: 'Yes please' },
                    { value: false, label: 'No thanks' },
                  ].map(opt => (
                    <button
                      key={String(opt.value)}
                      onClick={() => update('tourGuideRequired', opt.value)}
                      className={`p-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.tourGuideRequired === opt.value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/40 text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Add-Ons & Notes */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <h3 className="text-lg font-bold text-foreground mb-4">Add-Ons & Notes</h3>

              <div className="space-y-3">
                {ADD_ONS.filter(a => !['security', 'tour-guide'].includes(a.id)).map(addOn => (
                  <button
                    key={addOn.id}
                    onClick={() => {
                      const current = form.selectedAddOns;
                      update('selectedAddOns',
                        current.includes(addOn.id)
                          ? current.filter(id => id !== addOn.id)
                          : [...current, addOn.id]
                      );
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      form.selectedAddOns.includes(addOn.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{addOn.name}</p>
                        <p className="text-xs text-muted mt-1">{addOn.description}</p>
                        <p className="text-xs text-primary font-semibold mt-1">{addOn.note}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ml-4 flex items-center justify-center ${
                        form.selectedAddOns.includes(addOn.id)
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`}>
                        {form.selectedAddOns.includes(addOn.id) && (
                          <CheckCircle2 size={12} className="text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Dietary Restrictions / Allergies</label>
                <Textarea
                  placeholder="e.g. vegetarian, gluten-free, nut allergy..."
                  value={form.dietaryRestrictions}
                  onChange={e => update('dietaryRestrictions', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Special Requests</label>
                <Textarea
                  placeholder="Anything else we should know about your group or trip?"
                  value={form.specialRequests}
                  onChange={e => update('specialRequests', e.target.value)}
                  rows={3}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 5 — Review & Submit */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-lg font-bold text-foreground mb-4">Review Your Request</h3>

              <div className="space-y-3 text-sm">
                {[
                  { label: 'Package', value: packageName },
                  { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                  { label: 'Email', value: form.email },
                  { label: 'Phone', value: form.phone },
                  { label: 'People', value: `${form.numberOfPeople} people` },
                  { label: 'Arrival', value: form.arrivalDate || 'TBC' },
                  { label: 'Departure', value: form.departureDate || 'TBC' },
                  { label: 'Flights', value: form.flightsIncluded === true ? 'Include flights' : form.flightsIncluded === false ? 'Self-arranged' : 'TBC' },
                  { label: 'Accommodation', value: form.accommodationType || 'TBC' },
                  { label: 'Security', value: form.securityRequired === true ? 'Yes' : form.securityRequired === false ? 'No' : 'TBC' },
                  { label: 'Tour Guide', value: form.tourGuideRequired === true ? 'Yes' : form.tourGuideRequired === false ? 'No' : 'TBC' },
                  { label: 'Bali Entry Fee', value: `$${form.baliEntryFeeTotal} NZD (auto-included)` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted font-medium">{item.label}</span>
                    <span className="text-foreground font-semibold text-right ml-4">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-bold mb-2">Deposit & Payment Terms</p>
                <p>• $1,000 NZD deposit per person — non-refundable, non-transferable</p>
                <p>• Full payment due 6 weeks before departure</p>
                <p>• We'll email you a deposit payment link once you confirm</p>
              </div>

              <div className="bg-gray-50 border border-border rounded-xl p-4 text-xs text-muted">
                By submitting this quote request, you agree that Bali Flock Tours acts purely as a facilitator and organiser of travel experiences. Please review our full Terms & Conditions before confirming your booking.
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="font-semibold">
              <ChevronLeft size={16} className="mr-1" /> Back
            </Button>
          ) : <div />}

          {step < 5 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6"
            >
              Continue <ChevronRight size={16} className="ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
            >
              {submitting ? 'Sending...' : 'Submit Quote Request'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
