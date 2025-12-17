import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, subscriptions, devices } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// This endpoint is called by the extension to validate user's subscription
export async function POST(request: Request) {
    try {
        // Get session from auth header (extension sends auth token)
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { valid: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const body = await request.json().catch(() => ({}));
        const { deviceFingerprint, browserInfo, deviceName } = body;

        // Check active subscription
        const activeSubscription = await db.query.subscriptions.findFirst({
            where: and(
                eq(subscriptions.userId, userId),
                eq(subscriptions.status, 'active'),
                gt(subscriptions.endDate, new Date())
            ),
        });

        if (!activeSubscription) {
            return NextResponse.json({
                valid: false,
                error: 'No active subscription',
                subscriptionRequired: true,
            });
        }

        // Track device if fingerprint provided
        if (deviceFingerprint) {
            // Check existing device
            const existingDevice = await db.query.devices.findFirst({
                where: and(
                    eq(devices.userId, userId),
                    eq(devices.deviceFingerprint, deviceFingerprint)
                ),
            });

            if (existingDevice) {
                // Update last active
                await db.update(devices)
                    .set({ lastActive: new Date() })
                    .where(eq(devices.id, existingDevice.id));
            } else {
                // Check device limit
                const activeDevices = await db.query.devices.findMany({
                    where: and(
                        eq(devices.userId, userId),
                        eq(devices.isActive, true)
                    ),
                });

                if (activeDevices.length >= 3) {
                    return NextResponse.json({
                        valid: false,
                        error: 'Device limit reached',
                        deviceLimitReached: true,
                        maxDevices: 3,
                    });
                }

                // Register new device
                await db.insert(devices).values({
                    userId,
                    deviceFingerprint,
                    browserInfo: browserInfo || null,
                    deviceName: deviceName || 'Unknown Device',
                    lastActive: new Date(),
                    isActive: true,
                });
            }
        }

        // Get user info
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
        });

        return NextResponse.json({
            valid: true,
            subscription: {
                plan: activeSubscription.plan,
                endDate: activeSubscription.endDate,
                daysRemaining: Math.ceil(
                    (activeSubscription.endDate!.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                ),
            },
            user: {
                name: user?.name,
                email: user?.email,
            },
            features: {
                productAnalysis: true,
                storeAnalysis: true,
                exportData: true,
                trendingProducts: true,
            },
        });
    } catch (error) {
        console.error('License validation error:', error);
        return NextResponse.json(
            { valid: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
