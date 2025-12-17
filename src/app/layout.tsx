import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dilarisin - Shopee Seller Analytics Tool",
  description:
    "Insight kompetitor, analisis tren, dan riset kata kunci dalam satu klik dengan ekstensi browser nomor 1 untuk Seller Shopee.",
  keywords: [
    "shopee analytics",
    "seller tools",
    "keyword research",
    "competitor analysis",
    "dropship",
    "marketplace indonesia",
  ],
  openGraph: {
    title: "Dilarisin - Shopee Seller Analytics Tool",
    description:
      "Optimalkan penjualan Shopee Anda dengan data real-time. Dipercaya 5,000+ seller.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} font-sans antialiased overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

