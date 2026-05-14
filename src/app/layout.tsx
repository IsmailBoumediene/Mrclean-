import type { Metadata, Viewport } from 'next';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const SITE_URL = 'https://www.mrcleanplus.ca';
const DEFAULT_TITLE = 'Mr Clean+ | Service de nettoyage professionnel à Montréal, Laval, Rive-Nord et Rive-Sud';
const DEFAULT_DESCRIPTION =
  'Service de nettoyage professionnel à Montréal, Laval, Rive-Nord et Rive-Sud. Nettoyage résidentiel, commercial, Airbnb, grand ménage et après-construction. Soumission gratuite — 20% de rabais sur votre premier nettoyage régulier.';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F3' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1B26' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Mr Clean+',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: 'Mr Clean+',
  authors: [{ name: 'Mr Clean+', url: SITE_URL }],
  creator: 'Mr Clean+',
  publisher: 'Mr Clean+',
  category: 'Cleaning Services',
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Mr Clean+',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: 'fr_CA',
    alternateLocale: ['en_CA'],
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mr Clean+ — Cleaning services Montreal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/logo.png'],
  },
  verification: {
    google: 'N7Z7q83a_9kJjUAHRolY8TZSuOdCjKGRTB11QjLU8lY',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
