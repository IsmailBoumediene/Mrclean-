import { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  };
}

export default async function AboutPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-slide-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mc-page-hero-title mb-4">
            {dict.about.title}
          </h1>
          <p className="mc-page-hero-subtitle text-primary-100">
            {dict.about.subtitle}
          </p>
        </div>
      </section>

      {/* About Content + Proof Items */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-700 leading-relaxed mb-10">
            {dict.about.description}
          </p>
          <ul className="mc-about-proof-list">
            {dict.about.proofItems.map((item, i) => (
              <li key={i} className="mc-about-proof-item">
                <span className="mc-about-proof-check">✔</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {dict.about.whyChooseUs}
          </h2>
          <div className="mc-about-values-grid">
            {dict.about.values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{['🎯', '👥', '✅', '🕐'][index]}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{dict.about.engagementTitle}</h2>
          <p className="text-xl text-gray-900 leading-relaxed">{dict.about.engagementText}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{dict.about.ctaTitle}</h2>
          <Link href={`/${params.lang}/consult`} className="mc-about-cta-btn">
            {dict.about.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
