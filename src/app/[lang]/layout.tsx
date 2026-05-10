import { Locale, i18n } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mr Clean+',
    url: `https://www.mrcleanplus.ca/${params.lang}`,
    logo: 'https://www.mrcleanplus.ca/images/logo.png',
    email: 'info@mrcleanplus.ca',
    telephone: '+1 (514) 431-9741',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '315 Bd Rene-Levesque E, appartement 1605',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      postalCode: 'H2X 3P3',
      addressCountry: 'CA',
    },
    areaServed: ['Montreal', 'Laval', 'North Shore', 'South Shore'],
    sameAs: [
      'https://www.facebook.com/MrCleanPlus/?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
      'https://www.instagram.com/monsieurcleanplus/',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <TopBar dict={dict} />
      <Header lang={params.lang} dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={params.lang} dict={dict} />
    </>
  );
}
