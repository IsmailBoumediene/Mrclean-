import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mr Clean+',
  description: 'Professional cleaning services in Montreal',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
