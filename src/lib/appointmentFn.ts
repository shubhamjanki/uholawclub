import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
import { appointmentSchema } from './schema';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

async function checkRateLimit(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Skip rate limiting if Upstash is not configured (local dev)
  if (!url || url.includes('your-upstash-url') || !token || token === 'your_upstash_token') {
    console.warn('[appointmentFn] Upstash not configured — skipping rate limit check.');
    return true;
  }

  const { Ratelimit } = await import('@upstash/ratelimit');
  const { Redis } = await import('@upstash/redis');

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '10 m'),
  });

  const { success } = await ratelimit.limit(ip);
  return success;
}

// Use verified domain if set, otherwise fall back to Resend test sender.
// NOTE: onboarding@resend.dev can only send to the Resend account owner's email.
// To send to any client email, verify your domain at resend.com/domains.
const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN;
const FROM_ADDRESS = verifiedDomain
  ? `Appointments <noreply@${verifiedDomain}>`
  : 'Appointments <onboarding@resend.dev>';

export const submitAppointment = createServerFn({ method: 'POST' })
  .validator((data: unknown) => appointmentSchema.parse(data))
  .handler(async ({ data }) => {
    const allowed = await checkRateLimit('global-rate-limit');
    if (!allowed) {
      throw new Error('Too many requests. Try again later.');
    }

    const { name, email, phone, date, time, mode, tier, note, honeypot } = data;

    if (honeypot) {
      return { success: true }; // silently drop bots
    }

    const resend = getResend();

    // 1. Notify the business owner
    const ownerResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: 'uholawclub@gmail.com',
      subject: `New Appointment: ${name} - ${date ?? 'TBD'} ${time ?? ''}`.trim(),
      html: `<h2>New Appointment Request</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone ?? 'N/A'}</p><p><b>Date:</b> ${date ?? 'N/A'}</p><p><b>Time:</b> ${time ?? 'N/A'}</p><p><b>Mode:</b> ${mode ?? 'N/A'}</p><p><b>Tier:</b> ${tier ?? 'N/A'}</p><p><b>Note:</b> ${note}</p>`,
    });

    if (ownerResult.error) {
      console.error('[appointmentFn] Owner email error:', ownerResult.error);
      throw new Error(`Email failed: ${ownerResult.error.message}`);
    }

    // 2. Confirm to the client
    const clientResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Appointment Request Received',
      html: `<h2>Your Appointment Request is Received!</h2><p>Hi ${name},</p><p>We have received your appointment request for <b>${tier ?? 'consultation'}</b>.</p><p><b>Date:</b> ${date ?? 'TBD'} &nbsp;<b>Time:</b> ${time ?? 'TBD'}</p><p><b>Mode:</b> ${mode ?? 'N/A'}</p><p>Please pay via UPI ID: <b>uholawclub@sbi</b>.</p><p>We look forward to seeing you!</p>`,
    });

    if (clientResult.error) {
      console.error('[appointmentFn] Client email error:', clientResult.error);
      throw new Error(`Client email failed: ${clientResult.error.message}`);
    }

    console.log('[appointmentFn] Emails sent successfully.');
    return { success: true };
  });

