import { pgTable, uuid, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const subscriptionPlanEnum = pgEnum('subscription_plan', ['monthly', 'yearly', 'biennial']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'expired', 'cancelled', 'pending']);

export const subscriptions = pgTable('subscriptions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    plan: subscriptionPlanEnum('plan').notNull(),
    status: subscriptionStatusEnum('status').default('pending').notNull(),
    startDate: timestamp('start_date', { mode: 'date' }),
    endDate: timestamp('end_date', { mode: 'date' }),
    price: integer('price').notNull(), // in Rupiah
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

// Pricing constants (in Rupiah)
export const SUBSCRIPTION_PRICES = {
    monthly: 99000,
    yearly: 799000,
    biennial: 1299000,
} as const;

// Duration in days
export const SUBSCRIPTION_DURATION = {
    monthly: 30,
    yearly: 365,
    biennial: 730,
} as const;
