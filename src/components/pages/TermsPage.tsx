import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// BALI FLOCK TOURS — TERMS & CONDITIONS PAGE
// Add to your router: <Route path="/terms" element={<TermsPage />} />
// ============================================================

const COMPANY_EMAIL = 'raghavaggarwal2005@gmail.com';
const LAST_UPDATED = 'July 2025';

export default function TermsPage() {
  const sections = [
    {
      id: 'facilitator',
      title: '1. Nature of Service — Facilitator Only',
      content: `Bali Flock Tours ("we", "us", "our") acts purely as a facilitator and organiser of travel experiences. We are not a licensed travel agent or tour operator in the traditional sense. We coordinate and arrange third-party services including accommodation, transport, activities, and experiences on your behalf.

By booking with Bali Flock Tours, you acknowledge and agree that:
• We arrange services provided by independent third-party operators in Bali, Indonesia.
• We are not responsible for the acts, omissions, or negligence of any third-party service provider.
• All activities and experiences are undertaken entirely at your own risk.
• We strongly recommend all travellers obtain comprehensive travel insurance prior to departure.`,
    },
    {
      id: 'booking',
      title: '2. Booking & Confirmation',
      content: `A booking is confirmed once we have received your completed quote request and your non-refundable deposit payment.

Upon confirmation:
• You will receive a booking confirmation email with your reference number and trip details.
• Your departure date, group size, and selected options will be locked in.
• Any changes to your booking after confirmation are subject to availability and may incur additional costs.`,
    },
    {
      id: 'deposit',
      title: '3. Deposit & Payment',
      content: `Deposit: A non-refundable, non-transferable deposit of $1,000 NZD per person is required to secure your booking. This deposit is payable via the payment link provided in your booking confirmation.

Full Payment: The full remaining balance of your trip is due no later than six (6) weeks prior to your scheduled departure date. Failure to pay the full balance by this date may result in cancellation of your booking without refund of the deposit.

Currency: All prices are quoted in New Zealand Dollars (NZD) unless otherwise stated. Currency conversion is the responsibility of the traveller.

Bali Entry Fee: A mandatory Bali entry fee of $100 NZD per person (covering visa and tourism tax levy) is included in all quotes and is non-refundable once paid.`,
    },
    {
      id: 'refunds',
      title: '4. Cancellation & Refund Policy',
      content: `Deposits: All deposits are strictly non-refundable and non-transferable under any circumstances.

Cancellation by Client:
• 6+ weeks before departure: Loss of deposit only. Any additional payments made may be refunded at our discretion, less any non-recoverable costs.
• Less than 6 weeks before departure: No refund. Full payment is forfeited.
• No-show: No refund under any circumstances.

Cancellation by Bali Flock Tours: In the unlikely event that we are required to cancel your trip due to circumstances outside our control (including but not limited to natural disasters, government travel advisories, or force majeure events), we will offer a rescheduled trip date or a credit to the value of your booking. No cash refund will be provided for circumstances outside our control.

Travel Insurance: We strongly recommend comprehensive travel insurance that includes trip cancellation cover. We are not liable for any losses arising from your failure to obtain travel insurance.`,
    },
    {
      id: 'activities',
      title: '5. Activities & Participation',
      content: `All activities are arranged with third-party operators in Bali and are undertaken entirely at your own risk. By participating in any activity arranged through Bali Flock Tours, you:

• Confirm you are physically fit and medically able to participate.
• Accept all risks associated with the activity, including personal injury or death.
• Release Bali Flock Tours from any liability arising from participation in activities.
• Agree to follow all safety instructions provided by activity operators.

Each activity day includes an 8am pickup and 4–6pm drop-off, plus breakfast and lunch. A 1,000,000 IDR (Prady fee) applies per activity day and is included in your quote.

Free days within the itinerary may be swapped for an alternative activity at an additional cost, subject to availability.`,
    },
    {
      id: 'accommodation',
      title: '6. Accommodation',
      content: `Accommodation is arranged based on group size:
• Groups of 20 or more: Windom Hotel, Bali (Ocean View or Back View rooms as selected).
• Groups under 20: Private villa sourced via Booking.com or Airbnb.

All accommodation is subject to availability at time of booking. We reserve the right to substitute comparable accommodation if the selected option becomes unavailable. We are not responsible for the standard, condition, or service quality of third-party accommodation providers.`,
    },
    {
      id: 'security',
      title: '7. Security & Tour Guide Services',
      content: `Optional NZ Licensed Security and/or NZ Tour Guide services are available at an additional cost. These services are provided by independent contractors and not employees of Bali Flock Tours.

Cost: $100 NZD per day (service fee) + $80 NZD per day (accommodation) + flights (at cost) + $20 NZD per day (food per diems).

These personnel will accompany your group and assist with itinerary management, group coordination, and safety support. Bali Flock Tours makes no guarantee regarding the conduct or performance of these contractors beyond reasonable care in their selection.`,
    },
    {
      id: 'liability',
      title: '8. Limitation of Liability',
      content: `To the maximum extent permitted by law, Bali Flock Tours shall not be liable for:
• Any loss, damage, injury, illness, death, or expense arising from participation in any activity or travel arranged through us.
• Any acts or omissions of third-party service providers including accommodation, transport, or activity operators.
• Any loss or damage to personal property.
• Any delay, cancellation, or change to your trip caused by circumstances outside our control.
• Any consequential or indirect loss or damage.

Our total liability to you in any circumstances shall not exceed the total amount paid by you to Bali Flock Tours for your booking.`,
    },
    {
      id: 'health',
      title: '9. Health, Fitness & Medical',
      content: `It is your responsibility to ensure you are fit and healthy enough to participate in the activities included in your chosen package. You should consult your doctor prior to travel if you have any medical conditions or concerns.

You are responsible for ensuring you have the required vaccinations, medications, and health documentation for travel to Bali, Indonesia. We recommend checking official New Zealand government travel advice at safetravel.govt.nz prior to departure.`,
    },
    {
      id: 'insurance',
      title: '10. Travel Insurance',
      content: `Comprehensive travel insurance is strongly recommended for all travellers. At minimum, we recommend your policy covers:
• Trip cancellation and interruption
• Medical expenses and emergency evacuation
• Personal liability
• Theft or loss of personal belongings

We are not responsible for any loss, cost, or expense that would have been covered by an appropriate travel insurance policy.`,
    },
    {
      id: 'conduct',
      title: '11. Traveller Conduct',
      content: `All travellers are expected to behave in a respectful and responsible manner throughout the trip. We reserve the right to remove any traveller from the tour, without refund, if their behaviour is deemed to be:
• Dangerous to themselves or others
• Disrespectful of local laws, customs, or culture
• Disruptive to the group or third-party operators
• In violation of these Terms & Conditions

Travellers are responsible for compliance with all local laws and regulations in Bali, Indonesia.`,
    },
    {
      id: 'privacy',
      title: '12. Privacy',
      content: `We collect your personal information solely for the purpose of arranging and managing your booking. We will not share your personal information with third parties except as necessary to deliver your travel experience (e.g. sharing your details with accommodation or activity providers).

By submitting a booking request, you consent to us contacting you via email and phone regarding your booking.`,
    },
    {
      id: 'contact',
      title: '13. Contact & Disputes',
      content: `If you have any questions, concerns, or complaints, please contact us at ${COMPANY_EMAIL}.

These Terms & Conditions are governed by the laws of New Zealand. Any disputes shall be resolved in New Zealand courts.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Terms & Conditions</h1>
            <p className="text-white/80">Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12"
        >
          <p className="text-amber-900 font-semibold text-lg mb-2">Important — Please Read</p>
          <p className="text-amber-800">
            By submitting a booking request or making a payment to Bali Flock Tours, you confirm that you have read, understood, and agree to these Terms & Conditions in full. If you do not agree, please do not proceed with your booking.
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border-b border-border pb-10 last:border-0"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">{section.title}</h2>
              <div className="text-muted leading-relaxed whitespace-pre-line">{section.content}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
