'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ActivationCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    deviceName: string;
    activationCode: string;
}

export function ActivationCodeModal({
    isOpen,
    onClose,
    deviceName,
    activationCode,
}: ActivationCodeModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(activationCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    // Format code for display: XXXX-XXXX-XXXX-XXXX
    const formattedCode = activationCode.match(/.{1,4}/g)?.join('-') || activationCode;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white text-center">
                    <div className="size-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <Icon name="check_circle" className="text-4xl" />
                    </div>
                    <h2 className="text-xl font-bold">Perangkat Berhasil Dibuat!</h2>
                    <p className="text-white/80 text-sm mt-1">{deviceName}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-sm text-slate-600 text-center mb-4">
                        Salin kode aktivasi di bawah dan masukkan ke Extension Dilarisin
                    </p>

                    {/* Activation Code Box */}
                    <div className="bg-slate-50 rounded-xl p-4 border-2 border-dashed border-slate-200 mb-4">
                        <p className="text-xs text-slate-400 text-center mb-2 uppercase tracking-wider font-medium">
                            Kode Aktivasi
                        </p>
                        <p className="text-2xl font-mono font-bold text-slate-900 text-center tracking-wider">
                            {formattedCode}
                        </p>
                    </div>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={`w-full py-3 px-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${copied
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                            }`}
                    >
                        <Icon name={copied ? 'check' : 'content_copy'} />
                        {copied ? 'Tersalin!' : 'Salin Kode Aktivasi'}
                    </button>

                    {/* Warning */}
                    <div className="bg-amber-50 rounded-xl p-4 mt-4 border border-amber-100">
                        <div className="flex items-start gap-3">
                            <Icon name="warning" className="text-amber-500 text-lg shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-800">
                                <p className="font-semibold">Simpan kode ini dengan aman!</p>
                                <p className="text-amber-700 mt-1">
                                    Kode tidak akan ditampilkan lagi setelah dialog ini ditutup.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Done Button */}
                    <Button onClick={onClose} className="w-full mt-6">
                        Selesai
                    </Button>
                </div>
            </div>
        </div>
    );
}
