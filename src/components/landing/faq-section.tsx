'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';

const faqs = [
    {
        question: 'Apakah aman untuk akun Shopee saya?',
        answer:
            'Sangat aman. Dilarisin hanya membaca data publik yang tersedia di halaman Shopee dan tidak meminta akses login atau password akun Seller Shopee Anda.',
    },
    {
        question: 'Device apa saja yang didukung?',
        answer:
            'Saat ini Dilarisin tersedia sebagai ekstensi browser untuk Google Chrome, Microsoft Edge, dan browser berbasis Chromium lainnya di Desktop/Laptop. Belum tersedia untuk Mobile.',
    },
    {
        question: 'Apakah ada garansi uang kembali?',
        answer:
            'Ya, kami memberikan garansi 7 hari uang kembali jika Anda merasa fitur Dilarisin tidak membantu bisnis Anda.',
    },
    {
        question: 'Bagaimana cara berhenti berlangganan?',
        answer:
            'Anda bisa membatalkan langganan kapan saja melalui dashboard akun Dilarisin Anda. Tidak ada kontrak jangka panjang yang mengikat.',
    },
];

export function FAQSection() {
    return (
        <section id="faq" className="py-20 bg-white dark:bg-[#2d1b1b]">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                {/* Section Header */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-12">
                    Pertanyaan Umum (FAQ)
                </h2>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-slate-50 dark:bg-[#231a0f] rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left"
            >
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {question}
                </span>
                <span
                    className={`shrink-0 rounded-full bg-white dark:bg-slate-700 p-1.5 text-slate-900 dark:text-white sm:p-3 transition-transform duration-300 ${isOpen ? '-rotate-180' : ''
                        }`}
                >
                    <Icon name="expand_more" />
                </span>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}
