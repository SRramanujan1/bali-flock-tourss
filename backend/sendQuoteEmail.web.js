// ============================================================
// BALI FLOCK TOURS — WIX BACKEND EMAIL FUNCTION
//
// HOW TO SET THIS UP IN WIX STUDIO:
// 1. In your Wix project, go to the file explorer on the left
// 2. Create a new folder called "backend" if it doesn't exist
// 3. Inside "backend", create a new file called "sendQuoteEmail.web.js"
// 4. Paste this entire file into it
// 5. Done — the frontend BookingQuoteForm.tsx will call this automatically
//
// This uses Wix's built-in triggeredEmails or fetch to send emails.
// ============================================================

import { ok, badRequest, serverError } from 'wix-http-functions';
import { triggeredEmails } from 'wix-crm-backend'; // Wix CRM triggered emails
import { items } from 'wix-data'; // Wix CMS

const NOTIFICATION_EMAIL = 'raghavaggarwal2005@gmail.com';
const COLLECTION_NAME = 'quotes';

// HTTP Function — called from frontend via fetch('/_functions/sendQuoteEmail', ...)
export async function post_sendQuoteEmail(request) {
  try {
    const body = await request.body.json();
    const {
      packageName,
      packageId,
      contactName,
      contactEmail,
      contactPhone,
      numberOfPeople,
      arrivalDate,
      departureDate,
      flightsIncluded,
      accommodationType,
      securityRequired,
      tourGuideRequired,
      selectedAddOns,
      specialRequests,
      dietaryRestrictions,
      baliEntryFeeTotal,
      emailBody,
    } = body;

    // ---- 1. Save to Wix CMS ----
    const quoteRecord = {
      packageId,
      packageName,
      contactName,
      contactEmail,
      contactPhone,
      numberOfPeople,
      arrivalDate,
      departureDate,
      flightsIncluded: flightsIncluded ? 'Yes' : 'No',
      accommodationType,
      securityRequired: securityRequired ? 'Yes' : 'No',
      tourGuideRequired: tourGuideRequired ? 'Yes' : 'No',
      selectedAddOns: JSON.stringify(selectedAddOns || []),
      specialRequests,
      dietaryRestrictions,
      baliEntryFeeTotal,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    await items.insert(COLLECTION_NAME, quoteRecord);

    // ---- 2. Send email notification ----
    // Option A: Use Wix's built-in email (simplest)
    // You need to set up a triggered email template in Wix CRM dashboard first
    // Then replace 'YOUR_TEMPLATE_ID' with the ID from your Wix CRM dashboard
    //
    // await triggeredEmails.emailContact('YOUR_TEMPLATE_ID', contactEmail, {
    //   variables: {
    //     contactName,
    //     packageName,
    //     numberOfPeople: String(numberOfPeople),
    //   }
    // });

    // Option B: Use a simple nodemailer-style approach via Wix HTTP request to a mail service
    // (Replace with your preferred email service — SendGrid, Mailgun, etc.)
    // 
    // const emailPayload = {
    //   to: NOTIFICATION_EMAIL,
    //   from: 'noreply@baliflocktours.com',
    //   replyTo: contactEmail,
    //   subject: `New Quote: ${packageName} — ${contactName} (${numberOfPeople} people)`,
    //   text: emailBody,
    // };
    // await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${YOUR_SENDGRID_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify(emailPayload),
    // });

    // For now — log success (replace with real email sending above)
    console.log('Quote saved to CMS:', quoteRecord);
    console.log('Email body to send:', emailBody);

    return ok({
      body: JSON.stringify({ success: true, message: 'Quote saved successfully' }),
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sendQuoteEmail:', error);
    return serverError({
      body: JSON.stringify({ success: false, error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
