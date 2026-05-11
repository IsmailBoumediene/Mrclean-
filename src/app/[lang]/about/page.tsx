import { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { buildBreadcrumbLd, buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    lang: params.lang,
    route: 'about',
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isFr = params.lang === 'fr';
  const breadcrumbLd = buildBreadcrumbLd({
    lang: params.lang,
    items: [
      { name: dict.nav.home, path: '' },
      { name: dict.nav.about, path: '/about' },
    ],
  });

  return (
    <div className="mc-inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="hero-slide-bg mc-inner-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mc-eyebrow mc-eyebrow-on-dark">{isFr ? 'À propos' : 'About us'}</span>
          <h1 className="mc-page-hero-title mb-4">{dict.about.title}</h1>
          <p className="mc-page-hero-subtitle">{dict.about.subtitle}</p>
        </div>
      </section>

      {/* Description + Proof */}
      <section className="mc-inner-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-700 leading-relaxed mb-10">
            {dict.about.description}
          </p>
          <ul className="mc-about-proof-list">
            {dict.about.proofItems.map((item, i) => (
              <li key={i} className="mc-about-proof-item">
                <span className="mc-about-proof-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="mc-inner-section mc-section-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 mc-section-head">
            <span className="mc-eyebrow">{isFr ? 'Nos valeurs' : 'Our values'}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.whyChooseUs}
            </h2>
          </div>
          <div className="mc-about-values-grid">
            {dict.about.values.map((value, index) => (
              <div key={index}>
                <div className="mc-home-value-icon-wrap">
                  <span style={{ fontSize: '1.75rem' }}>{['🎯', '👥', '✅', '🕐'][index]}</span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="mc-inner-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mc-eyebrow">{isFr ? 'Notre engagement' : 'Our commitment'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{dict.about.engagementTitle}</h2>
          <p className="text-xl text-gray-700 leading-relaxed">{dict.about.engagementText}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mc-home-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{dict.about.ctaTitle}</h2>
          <Link href={`/${params.lang}/consult`} className="mc-home-cta-button">
            {dict.about.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
