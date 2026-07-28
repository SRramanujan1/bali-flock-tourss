import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// BALI FLOCK TOURS — FAQ PAGE
// Add to router: <Route path="/faq" element={<FAQPage />} />
// ============================================================

const COMPANY_EMAIL = 'raghavaggarwal2005@gmail.com';

const FAQ_CATEGORIES = [
  {
    category: 'Booking & Payments',
    faqs: [
      {
        q: 'How do I book a trip?',
        a: "It's simple. Browse our packages, click the one you're interested in, fill out your quote request (takes about 3 minutes), and we'll have a personalised quote in your inbox within 24 hours. Once you're happy, we'll send you a deposit payment link to lock it in.",
      },
      {
        q: 'How much is the deposit?',
        a: '$1,000 NZD per person. This is non-refundable and non-transferable once paid, so please make sure you\'re committed before proceeding.',
      },
      {
        q: 'When is the full payment due?',
        a: 'Full payment is due 6 weeks before your departure date. We\'ll remind you well in advance. If payment isn\'t received by this date, your booking may be cancelled without refund of deposit.',
      },
      {
        q: 'What currencies do you accept?',
        a: 'All prices are quoted in NZD (New Zealand Dollars). We can also show prices in AUD, USD, GBP, and EUR for reference. Payment is processed in NZD.',
      },
      {
        q: 'Can I pay in instalments?',
        a: 'Instalments aren\'t automatically set up, but if you\'d like to discuss a payment plan, get in touch and we\'ll see what we can do.',
      },
    ],
  },
  {
    category: 'The Trip',
    faqs: [
      {
        q: 'What is included in my package?',
        a: 'All packages include: all transport throughout your trip, airport pickup and drop-off, breakfast and lunch on every activity day, 8am pickup and 4–6pm drop-off on activity days, and Bali Flock support throughout. See each individual package for the full day-by-day breakdown.',
      },
      {
        q: "What's not included?",
        a: 'Flights (unless you select this option), accommodation (unless included in the package), dinners, personal spending money, travel insurance, and any optional add-ons. The Bali entry fee ($100 NZD per person for visa + tourism tax levy) is added to your quote automatically.',
      },
      {
        q: "What's the Bali Entry Fee?",
        a: 'Indonesia requires tourists to pay a tourism tax levy on arrival. This, combined with your visa, comes to approximately $100 NZD per person. We include this in your quote so there are no surprises at the airport.',
      },
      {
        q: 'Can I customise my package?',
        a: "Absolutely — that's what we're built for. All free days in any package can be swapped for an activity at an additional cost. You can also add activities, scooter hire, a tattoo studio session, and more. Just let us know in your quote request.",
      },
      {
        q: 'What time does each activity day start and end?',
        a: 'All activity days start with an 8am pickup from your accommodation and drop-off between 4–6pm. Breakfast and lunch are included on all activity days.',
      },
      {
        q: 'Can I add more people after booking?',
        a: "Get in touch as soon as possible — additional spots are subject to availability. Group size affects accommodation type (20+ uses Windom Hotel, under 20 uses a private villa), so changes to group size may affect your quote.",
      },
    ],
  },
  {
    category: 'Flights & Getting There',
    faqs: [
      {
        q: 'Do you arrange flights?',
        a: "Yes, if you select the flights option in your quote request, we'll include flights in your personalised quote. If you'd prefer to arrange your own flights, just select that option and we'll handle everything else.",
      },
      {
        q: 'What airport do I fly into?',
        a: "Ngurah Rai International Airport (DPS) in Denpasar, Bali. We'll arrange your airport pickup once you send us your flight details after booking.",
      },
      {
        q: 'When should I send my flight details?',
        a: "Once your booking is confirmed and deposit paid, we'll ask for your flight arrival details so we can arrange your airport pickup. You can send these via email to " + COMPANY_EMAIL,
      },
    ],
  },
  {
    category: 'Accommodation',
    faqs: [
      {
        q: 'What accommodation is included?',
        a: 'For groups of 20 or more, we use Windom Hotel (your choice of Ocean View or Back View rooms). For groups under 20, we source a private villa via Booking.com or Airbnb. Either way, we handle it all for you.',
      },
      {
        q: 'Can I upgrade my accommodation?',
        a: 'Yes — if you have specific accommodation preferences or want to upgrade, mention it in your special requests and we\'ll look at what\'s available.',
      },
      {
        q: 'Is the Couples Retreat accommodation different?',
        a: "Yes — the Couples Retreat includes 2 nights in beautiful Ubud accommodation on Days 5 and 6, in addition to your regular accommodation for the rest of the trip. Ubud is Bali's cultural heart and the setting is stunning.",
      },
    ],
  },
  {
    category: 'Safety & Support',
    faqs: [
      {
        q: "What safety support is provided?",
        a: 'All trips include Bali Flock coordination and support. We also offer optional NZ Licensed Security and/or NZ Tour Guide services for groups who want dedicated, around-the-clock support — including a fun roll-call system to keep the group together and on schedule.',
      },
      {
        q: 'What is the NZ Security / Tour Guide service?',
        a: 'This is an optional add-on where a New Zealand licensed security guard or tour guide accompanies your group for the entire trip. They handle group logistics, keep everyone safe, manage the roll-call system, and are available around the clock. Cost is $100 NZD/day + $80 NZD accommodation/day + flights + $20 NZD food per diems.',
      },
      {
        q: 'Do I need travel insurance?',
        a: 'Strongly recommended, yes. We require that all travellers have comprehensive travel insurance that covers medical expenses, emergency evacuation, trip cancellation, and personal liability. We are not liable for any loss that would have been covered by travel insurance.',
      },
      {
        q: 'What happens if someone gets injured during an activity?',
        a: "All activities are arranged with third-party operators and are undertaken at your own risk. We strongly recommend travel insurance with personal accident cover. In any emergency, our team and local operators will provide immediate support and assistance in getting appropriate medical help.",
      },
    ],
  },
  {
    category: 'Cancellations & Changes',
    faqs: [
      {
        q: 'What is your cancellation policy?',
        a: 'Deposits are strictly non-refundable and non-transferable. If you cancel more than 6 weeks before departure, additional payments may be refunded less non-recoverable costs. If you cancel within 6 weeks of departure, no refund is available. Please see our full Terms & Conditions for details.',
      },
      {
        q: 'Can I change my travel dates after booking?',
        a: 'Date changes are subject to availability and may incur additional costs. Contact us as early as possible if you need to change dates.',
      },
      {
        q: 'What if Bali Flock Tours cancels my trip?',
        a: "In the rare event we need to cancel (e.g. due to force majeure, natural disaster, or government travel advisories), we'll offer a rescheduled date or credit to the value of your booking. Please see our full Terms & Conditions.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown
          size={20}
          className={`text-muted flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Got Questions?</h1>
            <p className="text-white/80 text-lg">Everything you need to know about booking with Bali Flock Tours.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        {FAQ_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
              {cat.category}
            </h2>
            <div>
              {cat.faqs.map(faq => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Still have questions CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-white/80 mb-8">We're here to help. Shoot us an email and we'll get back to you fast.</p>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all"
            >
              <Mail size={20} />
              {COMPANY_EMAIL}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
