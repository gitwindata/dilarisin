import { NextResponse } from 'next/server';
import { db } from '@/db';
import { payments, subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifySignature, getSubscriptionEndDate } from '@/lib/midtrans';

// Midtrans webhook handler
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            order_id: orderId,
            status_code: statusCode,
            gross_amount: grossAmount,
            signature_key: signatureKey,
            transaction_status: transactionStatus,
            fraud_status: fraudStatus,
            payment_type: paymentType,
        } = body;

        // Verify signature
        const isValid = verifySignature(orderId, statusCode, grossAmount, signatureKey);

        if (!isValid) {
            console.error('Invalid signature for order:', orderId);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // Find payment record
        const payment = await db.query.payments.findFirst({
            where: eq(payments.orderId, orderId),
        });

        if (!payment) {
            console.error('Payment not found:', orderId);
            return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }

        // Determine payment status
        let paymentStatus: 'success' | 'pending' | 'failed' | 'expired' = 'pending';

        if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
            if (fraudStatus === 'accept' || !fraudStatus) {
                paymentStatus = 'success';
            } else {
                paymentStatus = 'failed';
            }
        } else if (transactionStatus === 'pending') {
            paymentStatus = 'pending';
        } else if (
            transactionStatus === 'deny' ||
            transactionStatus === 'cancel' ||
            transactionStatus === 'failure'
        ) {
            paymentStatus = 'failed';
        } else if (transactionStatus === 'expire') {
            paymentStatus = 'expired';
        }

        // Update payment record
        await db.update(payments)
            .set({
                status: paymentStatus,
                paymentType,
                midtransResponse: body,
                paidAt: paymentStatus === 'success' ? new Date() : null,
            })
            .where(eq(payments.id, payment.id));

        // If payment successful, activate subscription
        if (paymentStatus === 'success' && payment.subscriptionId) {
            const subscription = await db.query.subscriptions.findFirst({
                where: eq(subscriptions.id, payment.subscriptionId),
            });

            if (subscription) {
                const endDate = getSubscriptionEndDate(subscription.plan);

                await db.update(subscriptions)
                    .set({
                        status: 'active',
                        startDate: new Date(),
                        endDate,
                        updatedAt: new Date(),
                    })
                    .where(eq(subscriptions.id, subscription.id));

                console.log(`Subscription activated: ${subscription.id} until ${endDate}`);
            }
        }

        // If payment failed/expired, cancel subscription
        if ((paymentStatus === 'failed' || paymentStatus === 'expired') && payment.subscriptionId) {
            await db.update(subscriptions)
                .set({
                    status: 'cancelled',
                    updatedAt: new Date(),
                })
                .where(eq(subscriptions.id, payment.subscriptionId));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
