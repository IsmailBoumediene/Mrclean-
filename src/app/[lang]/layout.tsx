import { Locale, i18n } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import {
  buildLocalBusinessLd,
  buildOrganizationLd,
  buildWebSiteLd,
} from '@/lib/seo';

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

  const services = [
    dict.services.residential,
    dict.services.airbnb,
    dict.services.commercial,
    dict.services.moveRenovation,
    dict.services.airbnbCleaning,
    dict.services.staffing,
  ].map((s) => ({ title: s.title, description: s.description }));

  // Aggregate rating derived from in-app testimonials so it stays honest and in-sync
  const stars = dict.testimonials.items
    .map((t: { stars?: number }) => t.stars ?? 5)
    .filter((n: number) => Number.isFinite(n));
  const avg = stars.length ? stars.reduce((a: number, b: number) => a + b, 0) / stars.length : 5;
  const rating = { value: avg, reviewCount: dict.testimonials.items.length };

  const orgLd = buildOrganizationLd(params.lang);
  const siteLd = buildWebSiteLd(params.lang);
  const businessLd = buildLocalBusinessLd({ lang: params.lang, services, rating });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
      />
      <TopBar dict={dict} />
      <Header lang={params.lang} dict={dict} />
      <main className="min-h-screen" id="main">{children}</main>
      <Footer lang={params.lang} dict={dict} />
    </>
  );
}
