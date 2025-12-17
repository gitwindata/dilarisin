import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { subscriptions, payments, users } from '@/db/schema';
import { SUBSCRIPTION_PRICES } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createSnapTransaction, generateOrderId } from '@/lib/midtrans';
import { z } from 'zod';

const createPaymentSchema = z.object({
    plan: z.enum(['monthly', 'yearly', 'biennial']),
});

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = createPaymentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid plan selected' },
                { status: 400 }
            );
        }

        const { plan } = validation.data;
        const amount = SUBSCRIPTION_PRICES[plan];
        const orderId = generateOrderId();

        // Get user details
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.user.id),
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Create pending subscription
        const [subscription] = await db.insert(subscriptions).values({
            userId: session.user.id,
            plan,
            status: 'pending',
            price: amount,
        }).returning();

        // Create pending payment record
        await db.insert(payments).values({
            userId: session.user.id,
            subscriptionId: subscription.id,
            orderId,
            amount,
            status: 'pending',
            paymentType: 'qris',
        });

        // Create Midtrans transaction
        const snapTransaction = await createSnapTransaction({
            orderId,
            amount,
            customerName: user.name || 'Customer',
            customerEmail: user.email,
            customerPhone: user.phone || undefined,
            plan,
        });

        return NextResponse.json({
            success: true,
            orderId,
            token: snapTransaction.token,
            redirectUrl: snapTransaction.redirect_url,
        });
    } catch (error) {
        console.error('Payment creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment' },
            { status: 500 }
        );
    }
}
