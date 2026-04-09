import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mrcleanplus.ca'),
  title: {
    default: 'Mr Clean+ | Professional Cleaning Services in Montreal',
    template: '%s | Mr Clean+',
  },
  description: 'Professional cleaning services in Montreal, Laval, North Shore and South Shore. Residential, commercial, Airbnb, deep cleaning and post-renovation cleaning.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mr Clean+',
    title: 'Mr Clean+ | Professional Cleaning Services in Montreal',
    description: 'Professional cleaning services in Montreal, Laval, North Shore and South Shore.',
    url: 'https://www.mrcleanplus.ca',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Mr Clean+ Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr Clean+ | Professional Cleaning Services in Montreal',
    description: 'Professional cleaning services in Montreal, Laval, North Shore and South Shore.',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="google-site-verification" content="N7Z7q83a_9kJjUAHRolY8TZSuOdCjKGRTB11QjLU8lY" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
