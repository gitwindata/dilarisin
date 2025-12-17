import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { CheckoutHeader } from '@/components/subscription/checkout-header';
import Link from 'next/link';

export const metadata = {
    title: 'Pembayaran Berhasil - Dilarisin',
    description: 'Terima kasih! Pembayaran Anda telah berhasil diproses.',
};

export default function ConfirmationPage() {
    // In production, these would come from the payment callback/webhook
    const mockOrderData = {
        orderId: 'ORD-20241216-001',
        plan: 'Dilarisin Pro',
        duration: 'Tahunan (12 Bulan)',
        amount: 799000,
        paymentMethod: 'QRIS - GoPay',
        paidAt: new Date(),
        subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };

    function formatRupiah(amount: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    function formatDate(date: Date): string {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f7f5] dark:bg-[#231a0f]">
            <CheckoutHeader currentStep={3} />

            <main className="flex-1 w-full px-4 py-8 lg:px-10 lg:py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Success Icon & Message */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center size-20 rounded-full bg-green-100 text-green-600 mb-6">
                            <Icon name="check_circle" className="text-5xl" filled />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                            Pembayaran Berhasil!
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Terima kasih! Langganan Anda telah aktif.
                        </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Icon name="receipt_long" className="text-primary" />
                            Detail Transaksi
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                                <span className="font-mono font-bold text-slate-900 dark:text-white">
                                    {mockOrderData.orderId}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-gray-500 dark:text-gray-400">Paket</span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {mockOrderData.plan}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-gray-500 dark:text-gray-400">Durasi</span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {mockOrderData.duration}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-gray-500 dark:text-gray-400">Metode Pembayaran</span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {mockOrderData.paymentMethod}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-gray-500 dark:text-gray-400">Tanggal Bayar</span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {formatDate(mockOrderData.paidAt)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-gray-500 dark:text-gray-400">Berlaku Sampai</span>
                                <span className="font-medium text-green-600">
                                    {formatDate(mockOrderData.subscriptionEnd)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">Total Dibayar</span>
                                <span className="text-2xl font-black text-primary">
                                    {formatRupiah(mockOrderData.amount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Icon name="tips_and_updates" className="text-primary" />
                            Langkah Selanjutnya
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Icon name="check_circle" className="text-green-500 mt-0.5" />
                                <span>Install ekstensi Dilarisin dari Chrome Web Store</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Icon name="check_circle" className="text-green-500 mt-0.5" />
                                <span>Buka dashboard dan generate Kode Aktivasi</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Icon name="check_circle" className="text-green-500 mt-0.5" />
                                <span>Masukkan kode aktivasi di ekstensi untuk mulai analisis</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="flex-1">
                            <Link href="/dashboard">
                                <Icon name="dashboard" />
                                Buka Dashboard
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="flex-1">
                            <Link href="/dashboard/devices">
                                <Icon name="devices" />
                                Aktifkan Perangkat
                            </Link>
                        </Button>
                    </div>

                    {/* Email Notification */}
                    <p className="text-center text-sm text-gray-400 mt-8">
                        <Icon name="email" className="inline mr-1" />
                        Bukti pembayaran telah dikirim ke email Anda
                    </p>
                </div>
            </main>
        </div>
    );
}
