# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 campaign website for Steven V. Ceceri's Massachusetts State Representative race. It uses modern React patterns with the App Router, TypeScript, and integrates with Supabase for data storage and Stripe for donations.

## Development Commands

- **Development server**: `pnpm dev`
- **Build**: `pnpm build`
- **Production start**: `pnpm start`
- **Linting**: `pnpm lint`
- **Package manager**: Uses `pnpm` (not npm or yarn)

## Architecture & Key Technologies

### Core Stack
- **Next.js 15** with App Router (`/app` directory structure)
- **React 19** with TypeScript
- **Tailwind CSS** with custom configuration
- **Shadcn UI** components library (configured in `components.json`)
- **Supabase** for database and backend services
- **Stripe** for payment processing

### UI Framework
- Uses **Shadcn UI** with Radix UI primitives
- Components are in `/components/ui/` and configured via `components.json`
- Custom aliases: `@/components`, `@/lib/utils`, `@/hooks`
- Icons from **Lucide React**
- Fonts: Inter (body) and Merriweather Sans (headings)

### Database Schema
The Supabase database includes these main tables:
- `volunteers` - volunteer signups
- `social_posts` - social media aggregation
- `events` - campaign events
- `issues` - policy positions
- `donations` - contribution tracking
- `blog_posts` - blog content
- `testimonials` - endorsements
- `push_subscriptions` - web notifications

### Project Structure
- `/app/` - Next.js App Router pages and API routes
- `/components/` - React components (UI components in `/ui/` subdirectory)
- `/lib/` - Utility functions (main util: `cn()` for class merging)
- `/hooks/` - Custom React hooks
- `/scripts/` - Database setup scripts
- `/public/` - Static assets

### API Routes
Located in `/app/api/` with these endpoints:
- `community-events/` - Event data
- `create-checkout-session/` - Stripe payment processing
- `feed/` - Social media feed
- `volunteer/` - Volunteer form submissions

### Forms & Validation
- **React Hook Form** with **Zod** validation
- Form components: `contact-form.tsx`, `donation-form.tsx`, `volunteer-form.tsx`

### Special Configuration
- ESLint and TypeScript errors ignored during builds (`next.config.mjs`)
- Images are unoptimized for static deployment
- Uses CSS variables for theming via Tailwind CSS

## Development Notes

### Database Setup
Run SQL scripts from `/scripts/` in this order:
1. `create-tables.sql` - Creates all database tables
2. `seed-data.sql` - Populates initial data

### Environment Variables
Requires `.env.local` with:
- Supabase URL and keys
- Stripe secret keys
- Other service credentials

### Component Patterns
- Uses functional components with TypeScript
- Shadcn UI pattern for reusable components
- `cn()` utility function for conditional class merging (`lib/utils.ts`)
- Consistent use of Tailwind classes with custom CSS variables

### Styling Approach
- Tailwind CSS with custom configuration
- CSS variables for theme colors (primary: `#0E4D92`)
- Responsive design patterns throughout
- Custom font variables for Inter and Merriweather Sans