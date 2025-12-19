# Custom Package System - Implementation Guide

## Overview

This guide covers the complete implementation of the custom package system with:
1. ✅ Enhanced package customization with dietary restrictions and special requests
2. ✅ Quote saving to database with 2-month expiration
3. ✅ Booking confirmation page
4. ✅ Backend email integration framework
5. ✅ PDF generation service

---

## 1. Database Collections

### Quotes Collection (`quotes`)
Stores saved custom package quotes with 2-month expiration.

**Fields:**
- `packageId` (TEXT) - Reference to the holiday package
- `packageName` (TEXT) - Name of the package
- `userEmail` (TEXT) - Email of the user who saved the quote
- `dietaryRestrictions` (TEXT) - Dietary requirements
- `specialRequests` (TEXT) - Special requests
- `expirationDate` (DATETIME) - Quote expiration date (2 months from creation)
- `quoteStatus` (TEXT) - Status: "active" or "expired"
- `customizationDetails` (TEXT) - JSON string of full customization data

### Bookings Collection (`bookings`)
Stores completed bookings with confirmation details.

**Fields:**
- `bookingReference` (TEXT) - Unique booking reference number
- `bookingDate` (DATETIME) - When the booking was made
- `travelerEmail` (TEXT) - Primary traveler's email
- `packageDisplayName` (TEXT) - Name of the booked package
- `totalAmount` (NUMBER) - Total booking amount
- `currency` (TEXT) - Currency code (USD, EUR, etc.)
- `paymentStatus` (TEXT) - "Paid", "Pending", "Refunded"
- `bookingStatus` (TEXT) - "Confirmed", "Pending", "Cancelled"
- `specialRequests` (TEXT) - Special requests from booking
- `dietaryRestrictions` (TEXT) - Dietary restrictions
- `customizationDetails` (TEXT) - JSON string of customization data

---

## 2. New Pages & Routes

### PackageCustomizerPage (Enhanced)
**Path:** `/packages/:id/customize`

**New Features:**
- ✅ Dietary Restrictions field (free text)
- ✅ Special Requests field (free text)
- ✅ Save Quote button (requires authentication)
- ✅ Quote expiration tracking (2 months)

### BookingConfirmationPage (New)
**Path:** `/booking-confirmation?id=<booking-id>`

**Features:**
- Displays booking reference number
- Shows payment details and status
- Lists customization details
- Shows dietary restrictions and special requests
- Download confirmation button
- Resend confirmation email button
- Next steps guide

### MyQuotesPage (New)
**Path:** `/my-quotes`

**Features:**
- ✅ Protected route (requires authentication)
- ✅ Lists all user's saved quotes
- ✅ Separates active and expired quotes
- ✅ View quote details in modal
- ✅ Download quote as text file
- ✅ Delete quotes
- ✅ Shows expiration dates

---

## 3. Backend Email Integration

### Email Service (`/src/services/emailService.ts`)

Generic email service that can be connected to:
- SendGrid
- Mailgun
- AWS SES
- Custom SMTP
- Wix Email Services

**Configuration:**
```env
VITE_EMAIL_SERVICE_URL=https://your-backend.com/api/send-email
VITE_EMAIL_SERVICE_TOKEN=your-api-token
```

**Usage:**
```typescript
import { sendQuoteEmail, sendBookingConfirmationEmail } from '@/services/emailService';

// Send quote email
await sendQuoteEmail(
  'user@example.com',
  'European Adventure',
  quoteText,
  pdfContent // optional
);

// Send booking confirmation
await sendBookingConfirmationEmail(
  'traveler@example.com',
  'BK-123456',
  'European Adventure',
  5000,
  'USD'
);
```

---

## 4. PDF Generation

### PDF Service (`/src/services/pdfGenerator.ts`)

Provides PDF generation utilities for quotes and confirmations.

**Recommended Integration: jsPDF**

```bash
npm install jspdf
```

---

## 5. Complete Booking Flow

### Step 1: Customize Package
1. User navigates to `/packages/:id/customize`
2. Fills in trip details, activities, dietary restrictions, special requests
3. Views quote summary

### Step 2: Save Quote (Optional)
1. User clicks "Save Quote" (requires login)
2. Quote saved to database with 2-month expiration
3. User can access saved quotes from `/my-quotes`

### Step 3: Send Quote (Optional)
1. User enters email address
2. Clicks "Send Quote"
3. Email sent with quote details and optional PDF

### Step 4: Complete Booking
1. User clicks "Book Now" (implement in your booking flow)
2. Create booking record in database
3. Send booking confirmation email
4. Redirect to `/booking-confirmation?id=<booking-id>`

### Step 5: View Confirmation
1. User sees booking details
2. Can download confirmation
3. Can resend confirmation email
4. Sees next steps guide

---

## 6. Implementation Checklist

### Phase 1: Core Features (✅ Complete)
- [x] Create Quotes collection
- [x] Create Bookings collection
- [x] Update entity types
- [x] Enhance PackageCustomizerPage
- [x] Create BookingConfirmationPage
- [x] Create MyQuotesPage (protected)
- [x] Update Router with new routes

### Phase 2: Email Integration (Ready to Implement)
- [ ] Set up backend email service
- [ ] Configure VITE_EMAIL_SERVICE_URL
- [ ] Integrate sendQuoteEmail in customizer
- [ ] Integrate sendBookingConfirmationEmail in booking flow
- [ ] Test email delivery

### Phase 3: PDF Generation (Ready to Implement)
- [ ] Install jsPDF: `npm install jspdf`
- [ ] Implement PDF generation in email service
- [ ] Add PDF download buttons
- [ ] Test PDF generation

### Phase 4: Booking Flow (Ready to Implement)
- [ ] Create "Book Now" button in customizer
- [ ] Implement booking creation logic
- [ ] Send booking confirmation email
- [ ] Redirect to confirmation page
- [ ] Implement payment integration (if needed)

---

## 7. Environment Variables

Create a `.env` file in your project root:

```env
# Email Service Configuration
VITE_EMAIL_SERVICE_URL=https://your-backend.com/api/send-email
VITE_EMAIL_SERVICE_TOKEN=your-api-token
```

---

## 8. Files Created/Modified

### New Files:
- `/src/components/pages/BookingConfirmationPage.tsx`
- `/src/components/pages/MyQuotesPage.tsx`
- `/src/services/emailService.ts`
- `/src/services/pdfGenerator.ts`

### Modified Files:
- `/src/components/pages/PackageCustomizerPage.tsx` (enhanced)
- `/src/components/Router.tsx` (added new routes)
- `/src/entities/index.ts` (added Quotes and Bookings types)

---

## 9. Next Steps

1. **Test the customizer page** - Verify dietary restrictions and special requests fields work
2. **Test quote saving** - Login and save a quote, verify it appears in My Quotes
3. **Test booking confirmation** - Create a test booking and view confirmation page
4. **Set up email service** - Configure your backend email endpoint
5. **Integrate PDF generation** - Install jsPDF and implement PDF generation
6. **Complete booking flow** - Add "Book Now" button and booking creation logic

---

## 10. Support

For questions or issues:
- Check the console for error messages
- Verify all environment variables are set
- Ensure user is authenticated for protected routes
- Verify CMS collections exist and have correct fields
