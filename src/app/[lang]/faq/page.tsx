
import { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { FAQItem } from '@/types/faq';
import { buildBreadcrumbLd, buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    lang: params.lang,
    route: 'faq',
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
  });
}

export default async function FAQPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const faqItems = dict.faq.items as FAQItem[];
  const isFr = params.lang === 'fr';
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: params.lang,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  const breadcrumbLd = buildBreadcrumbLd({
    lang: params.lang,
    items: [
      { name: dict.nav.home, path: '' },
      { name: dict.nav.faq, path: '/faq' },
    ],
  });

  return (
    <div className="mc-faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="mc-faq-hero mc-inner-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mc-faq-hero-inner">
          <p className="mc-faq-kicker">FAQ</p>
          <h1 className="mc-page-hero-title mc-faq-title">{dict.faq.title}</h1>
          <p className="mc-page-hero-subtitle mc-faq-subtitle">{dict.faq.subtitle}</p>
          <p className="mc-faq-hero-note">
            {isFr
              ? 'Des réponses claires, un service premium et une expérience sans friction.'
              : 'Clear answers, premium service, and a frictionless experience.'}
          </p>
        </div>
      </section>

      <section className="mc-faq-content-wrap">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mc-faq-list">
            {faqItems.map((item) => (
              <details key={item.question} className="mc-faq-item">
                <summary className="mc-faq-summary">
                  <h2 className="mc-faq-question">{item.question}</h2>
                  <span className="mc-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="mc-faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mc-faq-cta">
            <h2 className="mc-faq-cta-title">{dict.faq.ctaTitle}</h2>
            <p className="mc-faq-cta-text">{dict.faq.ctaText}</p>
            <Link
              href={`/${params.lang}/consult`}
              className="mc-faq-cta-button"
            >
              {dict.common.getQuote}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
