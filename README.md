# ParBase

ParBase is a modern, subscription-based web application where golf meets social impact. Users log their Stableford scores, support their favorite charities with a portion of their subscription fee, and automatically enter monthly prize draws to win cash payouts based on their performance.

![ParBase Overview](https://via.placeholder.com/1200x600.png?text=ParBase+Dashboard) <!-- Replace with actual screenshot -->

## Features

- **Supabase Authentication**: Secure, out-of-the-box user authentication and sign-up flows.
- **Role-based Access**: Dual layouts tailored for `SUBSCRIBERS` and `ADMINS`.
- **Score Tracking**: Log Stableford scores to qualify for monthly prize draws.
- **Charity Donations**: Subscribers select a charity and allocate a customizable percentage of their monthly fee towards it.
- **Stripe Subscriptions**: Seamless subscription handling (Monthly & Yearly plans) directly integrated with Stripe.
- **Automated Draw Engine**: Admin-controlled monthly prize draws calculating winners based on random selection or algorithmic matching.
- **Transactional Emails**: Automated background emails via Resend (Welcome emails, Draw Results, Winner Notifications, and Payment Confirmations).
- **Beautiful UI**: Modern aesthetics using Tailwind CSS, Framer Motion for micro-interactions, dark mode out-of-the-box, and Shadcn/Base-UI components.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Prisma](https://www.prisma.io/) (\`@prisma/adapter-pg\`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Emails**: [Resend](https://resend.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v20+) installed and a [Supabase](https://supabase.com) account.

### 1. Clone & Install
\`\`\`bash
git clone https://github.com/yourusername/parbase.git
cd parbase
npm install
\`\`\`

### 2. Environment Setup
Create a \`.env\` file in the root directory and add the following keys:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key

# Prisma Database URLs
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT]:[PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[YOUR_PROJECT]:[PASSWORD]@aws-0-REGION.pooler.supabase.com:5432/postgres"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Resend
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@mail.yourdomain.com
\`\`\`

### 3. Database Setup (Prisma)
Push the Prisma schema to your Supabase PostgreSQL database:

\`\`\`bash
npx prisma db push
\`\`\`
*(Optional)* Generate the Prisma client locally:
\`\`\`bash
npx prisma generate
\`\`\`

### 4. Admin Setup (Optional)
Because user registrations default to the \`SUBSCRIBER\` role, you can use the built-in script to instantly generate an Admin account:

\`\`\`bash
npx tsx scripts/create-admin.ts
\`\`\`
*This will create an \`admin@parbase.com\` user so you can access the \`/admin\` dashboard right away.*

### 5. Run the Local Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). 

Because we output the Prisma client to a custom folder, the \`package.json\` includes a \`postinstall: "prisma generate"\` script. This ensures the Vercel build environment dynamically generates the types immediately upon installing the dependencies, completely side-stepping the \`Module Not Found\` build error.

1. Connect your GitHub repository to Vercel.
2. Add all your \`.env\` variables into the Vercel project settings.
3. Deploy!

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/parbase/issues).

---

<p align="center">Built by ParBase</p>
