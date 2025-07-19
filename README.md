# Ceceri for MA Campaign Website

## Description

This is the official campaign website for Steven V. Ceceri, candidate for the Massachusetts House of Representatives in the 8th Bristol District. The site provides information about the candidate, key issues, events, donation options, volunteer opportunities, and a social feed. It is built using modern web technologies for a responsive and engaging user experience.

## Features

- **Home Page**: Hero section, latest updates from social feed, issues carousel, and testimonials.
- **About Page**: Detailed biography, career timeline, endorsements, and personal information about Steven V. Ceceri.
- **Contact**: Form for reaching out to the campaign.
- **Donate**: Secure donation processing integrated with Stripe.
- **Events**: Upcoming campaign events.
- **Feed**: Social media updates.
- **Issues**: Key policy positions.
- **Volunteer**: Sign-up form for volunteers.
- Responsive design optimized for mobile and desktop.
- API routes for backend operations like checkout sessions, feed data, and volunteer submissions.
- Database integration with Supabase for data storage and querying.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Libraries**: Shadcn UI, Radix UI, Lucide React icons
- **Styling**: Tailwind CSS with animations
- **Database**: Supabase
- **Payments**: Stripe
- **Forms**: React Hook Form with Zod validation
- **Other**: React 19, TypeScript, Date-fns, Recharts, Embla Carousel, and more (see `package.json` for full list)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-repo/ceceriforma.git
   cd ceceriforma
   ```

2. Install dependencies using pnpm:

   ```
   pnpm install
   ```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add necessary keys (e.g., Supabase URL and key, Stripe secret key, etc.).

4. Set up the database:

   - Use Supabase dashboard or CLI to run the scripts in `/scripts/`:
     - `create-tables.sql` to create necessary tables.
     - `seed-data.sql` for initial data seeding.

5. Run the development server:
   ```
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Start Production**: `pnpm start`
- **Lint**: `pnpm lint`

### Testing Forms Before Schema Migration

Before pushing schema changes to Supabase, thoroughly test all forms:

1. **Run automated tests**:

   ```bash
   # Test all forms integration
   pnpm test:forms

   # Test contact form specifically
   pnpm test:contact

   # Run comprehensive dev environment check
   pnpm test:forms-dev
   ```

2. **Validate database schema**:

   ```bash
   pnpm validate-schema
   ```

3. **Manual testing checklist**:

   - Use the checklist in `scripts/manual-test-checklist.md`
   - Test all forms in browser at `http://localhost:3000`
   - Verify email delivery, database saves, and Stripe integration

4. **Generate and apply migrations**:
   ```bash
   pnpm db:generate  # Generate migration files
   pnpm db:migrate   # Apply to database
   ```

The site uses Next.js App Router for routing, with pages in `/app/` and components in `/components/`.

## Contact Form Email Setup

The contact form uses Gmail SMTP with an App Password for reliable email delivery.

### Environment Variables

Add these to your `.env.local` file:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=steve@ceceriforma.com
SMTP_PASS=xxxx xxxx xxxx xxxx   # 16-char app password (remove spaces)
CONTACT_TO=steve@ceceriforma.com
CONTACT_FROM=steve@ceceriforma.com   # keep same domain to avoid spoof flags
```

### Gmail App Password Setup

1. Ensure 2-Step Verification is enabled for `steve@ceceriforma.com`
2. Visit https://myaccount.google.com/apppasswords while logged into Steve's account
3. Create an "App Password" (select Other → name it "WebsiteContact")
4. Copy the 16-character password (this is your SMTP password)
5. Update the `SMTP_PASS` environment variable

### DNS Configuration (Google Workspace)

Ensure these DNS records are properly configured for deliverability:

- **MX Records**: 5 Google MX records with priorities (1,5,5,10,10)
- **SPF**: `v=spf1 include:_spf.google.com ~all`
- **DKIM**: Generated through Google Admin Console
- **DMARC**: `v=DMARC1; p=none; rua=mailto:dmarc@ceceriforma.com`

### Maintenance

- **Rotate App Passwords**: Google Account > Security > App Passwords > Delete old > Create new
- **Update Vercel**: Update `SMTP_PASS` environment variable and redeploy
- **Monitor**: All messages land in `steve@ceceriforma.com` inbox with subject prefix `[Contact]`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them using semantic commit messages (e.g., `feat: add new component`).
4. Push to the branch: `git push origin feature/your-feature`.
5. Create a pull request.

Ensure code follows the project's style: TypeScript, functional components, Tailwind CSS, etc.

## License

This project is licensed for private use by Steve Ceceri. See the [LICENSE](./LICENSE) file for details on usage and restrictions.
