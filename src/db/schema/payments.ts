import { pgTable, uuid, varchar, timestamp, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { subscriptions } from './subscriptions';

export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'success', 'failed', 'expired']);

export const payments = pgTable('payments', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    subscriptionId: uuid('subscription_id').references(() => subscriptions.id, { onDelete: 'set null' }),
    orderId: varchar('order_id', { length: 100 }).notNull().unique(), // Midtrans order ID
    amount: integer('amount').notNull(), // in Rupiah
    status: paymentStatusEnum('status').default('pending').notNull(),
    paymentType: varchar('payment_type', { length: 50 }), // 'qris'
    midtransResponse: jsonb('midtrans_response'),
    paidAt: timestamp('paid_at', { mode: 'date' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
