import { pgTable, uuid, varchar, text, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core'

// Volunteers table
export const volunteers = pgTable('volunteers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  preferredTasks: text('preferred_tasks').array(),
  availability: varchar('availability', { length: 255 }),
  message: text('message'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  emailIdx: index('idx_volunteers_email').on(table.email),
}))

// Social posts table
export const socialPosts = pgTable('social_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  platform: varchar('platform', { length: 50 }).notNull(),
  content: text('content').notNull(),
  mediaUrl: varchar('media_url', { length: 500 }),
  externalUrl: varchar('external_url', { length: 500 }),
  author: varchar('author', { length: 255 }).default('Steven V. Ceceri'),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  publishedAtIdx: index('idx_social_posts_published_at').on(table.publishedAt),
}))

// Events table
export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  location: varchar('location', { length: 255 }),
  address: text('address'),
  eventType: varchar('event_type', { length: 100 }),
  registrationRequired: boolean('registration_required').default(false),
  maxAttendees: integer('max_attendees'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  startDateIdx: index('idx_events_start_date').on(table.startDate),
}))

// Issues table
export const issues = pgTable('issues', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content').notNull(),
  priority: integer('priority').default(0),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// Donations table
export const donations = pgTable('donations', {
  id: uuid('id').defaultRandom().primaryKey(),
  stripeSessionId: varchar('stripe_session_id', { length: 255 }).unique(),
  donorName: varchar('donor_name', { length: 255 }).notNull(),
  donorEmail: varchar('donor_email', { length: 255 }).notNull(),
  donorAddress: text('donor_address'),
  donorCity: varchar('donor_city', { length: 100 }),
  donorState: varchar('donor_state', { length: 2 }),
  donorZip: varchar('donor_zip', { length: 10 }),
  donorOccupation: varchar('donor_occupation', { length: 255 }),
  donorEmployer: varchar('donor_employer', { length: 255 }),
  amountCents: integer('amount_cents').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  createdAtIdx: index('idx_donations_created_at').on(table.createdAt),
}))

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 500 }),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  publishedIdx: index('idx_blog_posts_published').on(table.published, table.publishedAt),
}))

// Testimonials table
export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }),
  organization: varchar('organization', { length: 255 }),
  content: text('content').notNull(),
  location: varchar('location', { length: 255 }),
  featured: boolean('featured').default(false),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// Push subscriptions table
export const pushSubscriptions = pgTable('push_subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  endpoint: text('endpoint').notNull(),
  p256dhKey: text('p256dh_key').notNull(),
  authKey: text('auth_key').notNull(),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// Export types for TypeScript
export type Volunteer = typeof volunteers.$inferSelect
export type NewVolunteer = typeof volunteers.$inferInsert

export type SocialPost = typeof socialPosts.$inferSelect
export type NewSocialPost = typeof socialPosts.$inferInsert

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert

export type Issue = typeof issues.$inferSelect
export type NewIssue = typeof issues.$inferInsert

export type Donation = typeof donations.$inferSelect
export type NewDonation = typeof donations.$inferInsert

export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert

export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert

export type PushSubscription = typeof pushSubscriptions.$inferSelect
export type NewPushSubscription = typeof pushSubscriptions.$inferInsert