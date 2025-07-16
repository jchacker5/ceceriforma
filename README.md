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

The site uses Next.js App Router for routing, with pages in `/app/` and components in `/components/`.

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
