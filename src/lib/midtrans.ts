import crypto from 'crypto';
import { SUBSCRIPTION_PRICES, SUBSCRIPTION_DURATION } from '@/db/schema';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY!;
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

const MIDTRANS_API_URL = IS_PRODUCTION
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

export interface CreateTransactionParams {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    plan: 'monthly' | 'yearly' | 'biennial';
}

export interface SnapTransaction {
    token: string;
    redirect_url: string;
}

export async function createSnapTransaction(
    params: CreateTransactionParams
): Promise<SnapTransaction> {
    const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64');

    const planNames = {
        monthly: 'Paket Bulanan (1 Bulan)',
        yearly: 'Paket Tahunan (12 Bulan)',
        biennial: 'Paket 2 Tahun (24 Bulan)',
    };

    const response = await fetch(MIDTRANS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify({
            transaction_details: {
                order_id: params.orderId,
                gross_amount: params.amount,
            },
            customer_details: {
                first_name: params.customerName,
                email: params.customerEmail,
                phone: params.customerPhone || '',
            },
            item_details: [
                {
                    id: params.plan,
                    price: params.amount,
                    quantity: 1,
                    name: planNames[params.plan],
                },
            ],
            enabled_payments: ['gopay', 'shopeepay', 'dana', 'ovo', 'linkaja', 'other_qris'],
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?status=success`,
                error: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?status=error`,
                pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?status=pending`,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Midtrans error:', error);
        throw new Error('Failed to create transaction');
    }

    return response.json();
}

export function verifySignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string
): boolean {
    const hash = crypto
        .createHash('sha512')
        .update(`${orderId}${statusCode}${grossAmount}${MIDTRANS_SERVER_KEY}`)
        .digest('hex');
    return hash === signatureKey;
}

export function generateOrderId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `DTK-${timestamp}-${random}`;
}

export function getSubscriptionEndDate(plan: 'monthly' | 'yearly' | 'biennial'): Date {
    const days = SUBSCRIPTION_DURATION[plan];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    return endDate;
}

export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export { SUBSCRIPTION_PRICES, MIDTRANS_CLIENT_KEY };
