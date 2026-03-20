import { resend, FROM_EMAIL } from "./resend";

// ─── Welcome Email (on subscription signup) ────────────────────────

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Welcome to ParBase! 🏌️",
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Your subscription is now active. Here's what you can do:</p>
      <ul>
        <li>Enter your latest Stableford scores</li>
        <li>Choose a charity to support</li>
        <li>Join monthly prize draws</li>
      </ul>
      <p>Head to your dashboard to get started.</p>
    `,
  });
}

// ─── Draw Results Published ─────────────────────────────────────────

export async function sendDrawResultsEmail(
  to: string,
  name: string,
  month: string
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `ParBase Draw Results for ${month} 🎯`,
    html: `
      <h1>Draw Results Are In!</h1>
      <p>Hi ${name},</p>
      <p>The ${month} draw results have been published. 
         Log in to your dashboard to see if you're a winner!</p>
    `,
  });
}

// ─── Winner Notification ────────────────────────────────────────────

export async function sendWinnerNotificationEmail(
  to: string,
  name: string,
  matchType: string,
  prizeAmount: string
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "🎉 Congratulations! You've Won a ParBase Prize!",
    html: `
      <h1>You're a Winner, ${name}! 🎉</h1>
      <p>You matched <strong>${matchType}</strong> and won <strong>£${prizeAmount}</strong>!</p>
      <h2>Next Steps</h2>
      <ol>
        <li>Log in to your dashboard</li>
        <li>Upload proof of your score (screenshot)</li>
        <li>An admin will verify and process your payout</li>
      </ol>
      <p>Please upload your proof within 7 days to claim your prize.</p>
    `,
  });
}

// ─── Payment Confirmation ───────────────────────────────────────────

export async function sendPaymentConfirmationEmail(
  to: string,
  name: string,
  amount: string
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "ParBase Prize Payment Confirmed ✅",
    html: `
      <h1>Payment Sent!</h1>
      <p>Hi ${name},</p>
      <p>Your prize of <strong>£${amount}</strong> has been processed and sent to you.</p>
      <p>Thank you for being part of ParBase!</p>
    `,
  });
}

// ─── Subscription Renewal Reminder ──────────────────────────────────

export async function sendRenewalReminderEmail(
  to: string,
  name: string,
  expiryDate: string
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "ParBase Subscription Renewal Reminder",
    html: `
      <h1>Renewal Reminder</h1>
      <p>Hi ${name},</p>
      <p>Your ParBase subscription will renew on <strong>${expiryDate}</strong>.</p>
      <p>If you'd like to make any changes, visit your dashboard.</p>
    `,
  });
}
