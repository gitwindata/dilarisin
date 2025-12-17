import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const devices = pgTable('devices', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    deviceFingerprint: varchar('device_fingerprint', { length: 255 }).notNull(),
    browserInfo: text('browser_info'),
    deviceName: varchar('device_name', { length: 100 }),
    lastActive: timestamp('last_active', { mode: 'date' }).defaultNow(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export type Device = typeof devices.$inferSelect;
export type NewDevice = typeof devices.$inferInsert;

// Maximum devices allowed per subscription
export const MAX_DEVICES_PER_USER = 3;
