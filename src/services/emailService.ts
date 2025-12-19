/**
 * Email Service for sending quotes and confirmations
 * This is a generic backend integration service that can be connected to:
 * - SendGrid
 * - Mailgun
 * - AWS SES
 * - Custom SMTP server
 * - Wix Email Services
 */

interface EmailPayload {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  attachments?: {
    filename: string;
    content: string;
    contentType: string;
  }[];
}

interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email via backend API
 * Configure your backend endpoint in environment variables
 */
export async function sendEmail(payload: EmailPayload): Promise<SendEmailResponse> {
  const backendUrl = import.meta.env.VITE_EMAIL_SERVICE_URL;

  if (!backendUrl) {
    console.warn('Email service URL not configured. Set VITE_EMAIL_SERVICE_URL in .env');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EMAIL_SERVICE_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Email service returned ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send quote email with PDF attachment
 */
export async function sendQuoteEmail(
  recipientEmail: string,
  packageName: string,
  quoteText: string,
  pdfContent?: string
): Promise<SendEmailResponse> {
  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Your Custom Holiday Package Quote</h2>
        <p>Hi there,</p>
        <p>Thank you for customizing your holiday package! Your personalized quote for <strong>${packageName}</strong> is ready.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="white-space: pre-wrap; font-family: monospace; font-size: 12px;">
            ${quoteText}
          </p>
        </div>
        
        <p>This quote is valid for 2 months from the date of creation. To proceed with your booking or if you have any questions, please reply to this email or contact our team.</p>
        
        <p>Best regards,<br/>The Holiday Package Team</p>
      </body>
    </html>
  `;

  const attachments = pdfContent
    ? [
        {
          filename: `quote-${packageName.replace(/\s+/g, '-')}.pdf`,
          content: pdfContent,
          contentType: 'application/pdf',
        },
      ]
    : [];

  return sendEmail({
    to: recipientEmail,
    subject: `Your Custom Holiday Package Quote - ${packageName}`,
    htmlContent,
    textContent: quoteText,
    attachments,
  });
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(
  recipientEmail: string,
  bookingReference: string,
  packageName: string,
  totalAmount: number,
  currency: string,
  customizationDetails?: string
): Promise<SendEmailResponse> {
  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Booking Confirmation</h2>
        <p>Hi there,</p>
        <p>Your holiday package booking has been confirmed! Thank you for choosing us.</p>
        
        <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
          <h3 style="margin-top: 0; color: #2e7d32;">Booking Reference: ${bookingReference}</h3>
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Total Amount:</strong> ${currency} ${totalAmount.toFixed(2)}</p>
        </div>
        
        <h3>What's Next?</h3>
        <ol>
          <li>Review your customization details (attached)</li>
          <li>Our team will contact you within 24 hours to confirm final details</li>
          <li>Complete payment to finalize your booking</li>
          <li>Receive your detailed itinerary and travel documents</li>
        </ol>
        
        <p>If you have any questions or need to make changes, please contact us immediately with your booking reference number.</p>
        
        <p>Best regards,<br/>The Holiday Package Team</p>
      </body>
    </html>
  `;

  const textContent = `
Booking Confirmation

Booking Reference: ${bookingReference}
Package: ${packageName}
Total Amount: ${currency} ${totalAmount.toFixed(2)}

${customizationDetails || ''}

Thank you for your booking!
  `;

  return sendEmail({
    to: recipientEmail,
    subject: `Booking Confirmation - ${bookingReference}`,
    htmlContent,
    textContent,
  });
}

/**
 * Example backend endpoint implementation (Node.js/Express)
 * 
 * POST /api/send-email
 * 
 * import nodemailer from 'nodemailer';
 * 
 * const transporter = nodemailer.createTransport({
 *   service: 'gmail',
 *   auth: {
 *     user: process.env.EMAIL_USER,
 *     pass: process.env.EMAIL_PASSWORD,
 *   },
 * });
 * 
 * app.post('/api/send-email', async (req, res) => {
 *   const { to, subject, htmlContent, textContent, attachments } = req.body;
 * 
 *   try {
 *     const info = await transporter.sendMail({
 *       from: process.env.EMAIL_FROM,
 *       to,
 *       subject,
 *       html: htmlContent,
 *       text: textContent,
 *       attachments: attachments?.map(att => ({
 *         filename: att.filename,
 *         content: Buffer.from(att.content, 'base64'),
 *         contentType: att.contentType,
 *       })),
 *     });
 * 
 *     res.json({ success: true, messageId: info.messageId });
 *   } catch (error) {
 *     res.status(500).json({ success: false, error: error.message });
 *   }
 * });
 */
