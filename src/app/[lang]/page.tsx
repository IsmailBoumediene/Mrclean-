import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { buildBreadcrumbLd, buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import HomeHeroCarousel from '@/components/HomeHeroCarousel';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { FaHome, FaBuilding, FaUsers, FaArrowRight, FaSoap, FaTruckMoving, FaKey, FaCheckCircle, FaLeaf, FaShieldAlt, FaClock } from 'react-icons/fa';
import residentialBg from '@/images/Residentiel.png';
import commercialBg from '@/images/Commercial.png';
import deepCleaningBg from '@/images/Grand-menage-new.jpg';
import staffingBg from '@/images/Personnage.png';
import afterConstructionBg from '@/images/Apres construction.png';
import airbnbBg from '@/images/airbnb.png';

const CoverageMap = dynamic(() => import('@/components/CoverageMap'), { ssr: false });

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    lang: params.lang,
    route: '',
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isFr = params.lang === 'fr';
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: 'Mr Clean+',
    url: `https://www.mrcleanplus.ca/${params.lang}`,
    image: 'https://www.mrcleanplus.ca/images/logo.png',
    telephone: '+1 (514) 431-9741',
    email: 'info@mrcleanplus.ca',
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Montreal' },
      { '@type': 'City', name: 'Laval' },
      { '@type': 'AdministrativeArea', name: 'North Shore' },
      { '@type': 'AdministrativeArea', name: 'South Shore' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '315 Bd Rene-Levesque E, appartement 1605',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      postalCode: 'H2X 3P3',
      addressCountry: 'CA',
    },
    sameAs: [
      'https://www.facebook.com/MrCleanPlus/?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
      'https://www.instagram.com/monsieurcleanplus/',
    ],
  };
  const breadcrumbLd = buildBreadcrumbLd({
    lang: params.lang,
    items: [{ name: dict.nav.home, path: '' }],
  });

  const trustStats = [
    {
      icon: <FaCheckCircle />,
      value: '100+',
      label: isFr ? 'Mandats complétés' : 'Jobs completed',
    },
    {
      icon: <FaShieldAlt />,
      value: '99%',
      label: isFr ? 'Clients satisfaits' : 'Satisfied clients',
    },
    {
      icon: <FaClock />,
      value: '7/7',
      label: isFr ? 'Horaire flexible' : 'Flexible scheduling',
    },
    {
      icon: <FaLeaf />,
      value: isFr ? 'Éco' : 'Eco',
      label: isFr ? 'Produits adaptés' : 'Eco-friendly options',
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero Section */}
      <HomeHeroCarousel
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        ctaLabel={dict.hero.ctaSecondary}
        intervalMs={4000}
        promoHeadline={isFr ? 'Offre de bienvenue' : 'Welcome offer'}
        promoTagline={isFr ? 'sur votre premier nettoyage régulier' : 'on your first regular cleaning'}
        primaryCtaLabel={isFr ? 'Réclamer mon 20% de rabais' : 'Claim my 20% off quote'}
        primaryCtaHref={`/${params.lang}/consult?promo=welcome20`}
      />

      {/* Trust Strip */}
      <section className="mc-trust-strip">
        <div className="mc-trust-strip-inner">
          {trustStats.map((stat, i) => (
            <div key={i} className="mc-trust-item">
              <span className="mc-trust-icon" aria-hidden="true">{stat.icon}</span>
              <div className="mc-trust-text">
                <span className="mc-trust-value">{stat.value}</span>
                <span className="mc-trust-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="mc-home-services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 mc-section-head">
            <span className="mc-eyebrow">{isFr ? 'Nos services' : 'Our services'}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.services.title}
            </h2>
            <p className="text-xl text-gray-600 mc-section-lede">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="mc-home-services-grid">
            <ServiceCard
              title={dict.services.residential.title}
              description={dict.services.residential.description}
              features={dict.services.residential.features}
              icon={<FaHome />}
              backgroundImage={residentialBg.src}
              showDetails={false}
              ctaLabel={dict.common.learnMore}
              ctaHref={`/${params.lang}/services#service-regular-cleaning`}
            />
            <ServiceCard
              title={dict.services.airbnb.title}
              description={dict.services.airbnb.description}
              features={dict.services.airbnb.features}
              icon={<FaSoap />}
              backgroundImage={deepCleaningBg.src}
              backgroundPosition="center 25%"
              showDetails={false}
              ctaLabel={dict.common.learnMore}
              ctaHref={`/${params.lang}/services#service-deep-cleaning`}
            />
            <ServiceCard
              title={dict.services.commercial.title}
              description={dict.services.commercial.description}
              features={dict.services.commercial.features}
              icon={<FaBuilding />}
              backgroundImage={commercialBg.src}
              showDetails={false}
              ctaLabel={dict.common.learnMore}
              ctaHref={`/${params.lang}/services#service-commercial`}
            />
            <ServiceCard
              title={dict.services.moveRenovation.title}
              description={dict.services.moveRenovation.description}
              features={dict.services.moveRenovation.features}
              icon={<FaTruckMoving />}
              backgroundImage={afterConstructionBg.src}
              backgroundPosition="center 6%"
              showDetails={false}
              ctaLabel={dict.common.learnMore}
              ctaHref={`/${params.lang}/services#service-move-renovation`}
            />
            <ServiceCard
              title={dict.services.airbnbCleaning.title}
              description={dict.services.airbnbCleaning.description}
              features={dict.services.airbnbCleaning.features}
              icon={<FaKey />}
              backgroundImage={airbnbBg.src}
              showDetails={false}
              ctaLabel={dict.common.learnMore}
              ctaHref={`/${params.lang}/services#service-airbnb-cleaning`}
            />
            <ServiceCard
              title={dict.services.staffing.title}
              description={dict.services.staffing.description}
              features={dict.services.staffing.features}
              icon={<FaUsers />}
              backgroundImage={staffingBg.src}
              backgroundPosition="center 5%"
              showDetails={false}
              ctaLabel={dict.common.learnMore}
              ctaHref={`/${params.lang}/services#service-staffing`}
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${params.lang}/services`}
              className="mc-link-arrow"
            >
              {isFr ? 'Voir tous les services' : 'View all services'}
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mc-home-why-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 mc-section-head">
            <span className="mc-eyebrow">{isFr ? 'Pourquoi nous choisir' : 'Why us'}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.whyChooseUs}
            </h2>
            <p className="text-lg text-gray-600 mc-section-lede" style={{ maxWidth: '62ch', margin: '0 auto' }}>
              {dict.about.companyDescription}
            </p>
          </div>

          <div className="mc-home-values-grid">
            {dict.about.values.map((value, index) => (
              <div key={index}>
                <div className="mc-home-value-icon-wrap">
                  <span style={{ fontSize: '1.75rem' }}>{['🎯', '👥', '🌿', '✨'][index]}</span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mc-home-testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 mc-section-head">
            <span className="mc-eyebrow">{isFr ? 'Témoignages' : 'Testimonials'}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.testimonials.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.testimonials.items.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                text={testimonial.text}
                service={testimonial.service}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mc-home-map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center mc-section-head">
          <span className="mc-eyebrow">{isFr ? 'Zones desservies' : 'Service area'}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isFr ? 'Présents partout dans le Grand Montréal' : 'Across Greater Montreal'}
          </h2>
          <p className="text-lg text-gray-600 mx-auto mc-section-lede" style={{ maxWidth: '66ch' }}>
            {isFr
              ? "Nos équipes interviennent à Montréal, Laval, sur la Rive-Nord et la Rive-Sud pour résidences, commerces et locations courte durée."
              : 'Our teams operate in Montreal, Laval, the North Shore, and the South Shore for homes, businesses, and short-term rentals.'}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="mc-area-chip">Montreal, QC</span>
            <span className="mc-area-chip">Laval, QC</span>
            <span className="mc-area-chip">{isFr ? 'Rive-Nord' : 'North Shore'}</span>
            <span className="mc-area-chip">{isFr ? 'Rive-Sud' : 'South Shore'}</span>
          </div>
        </div>
        <div className="mc-home-map-wrap">
          <CoverageMap lang={params.lang} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="mc-home-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mc-eyebrow mc-eyebrow-on-dark">{isFr ? 'Soumission gratuite' : 'Free quote'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isFr ? 'Prêt à avoir un espace impeccable?' : 'Ready for a spotless space?'}
          </h2>
          <p className="text-xl mb-8 mc-home-cta-subtitle">
            {isFr
              ? "Contactez-nous aujourd'hui pour un devis gratuit et sans engagement."
              : 'Contact us today for a free, no-obligation quote.'}
          </p>
          <Link
            href={`/${params.lang}/consult`}
            className="mc-home-cta-button"
          >
            {dict.common.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}
