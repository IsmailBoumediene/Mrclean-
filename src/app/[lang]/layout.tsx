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

  return (
    <html lang={params.lang}>
      <body>
        <TopBar dict={dict} />
        <Header lang={params.lang} dict={dict} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={params.lang} dict={dict} />
      </body>
    </html>
  );
}
