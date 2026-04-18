import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vetaura — Weightless Pet Care in Bhubaneswar',
  description:
    'From local volunteer dog walkers to complete medical care, Vetaura takes the stress out of pet parenting in Bhubaneswar, Odisha. Find caretakers, book vets, and access expert pet tips.',
  keywords: [
    'pet care Bhubaneswar',
    'dog walker Bhubaneswar',
    'vet booking Odisha',
    'pet sitting Bhubaneswar',
    'veterinary Bhubaneswar',
    'Vetaura',
  ],
  openGraph: {
    title: 'Vetaura — Weightless Pet Care in Bhubaneswar',
    description:
      'Find trusted volunteer caretakers and book veterinary appointments in Bhubaneswar, Odisha.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vetaura',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vetaura — Weightless Pet Care in Bhubaneswar',
    description:
      'Find trusted caretakers and book vets in Bhubaneswar. Pet care, reimagined.',
  },
  metadataBase: new URL('https://vetaura.in'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
