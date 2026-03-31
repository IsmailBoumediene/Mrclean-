import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ScrollToServicesBtn from '@/components/ScrollToServicesBtn';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { FaHome, FaBuilding, FaUsers, FaArrowRight, FaSoap, FaTruckMoving, FaKey } from 'react-icons/fa';
import residentialBg from '@/images/Residentiel.png';
import commercialBg from '@/images/Commercial.png';
import deepCleaningBg from '@/images/Grand-menage.png';
import staffingBg from '@/images/Personnage.png';
import afterConstructionBg from '@/images/Apres construction.png';
import airbnbBg from '@/images/airbnb.png';

const CoverageMap = dynamic(() => import('@/components/CoverageMap'), { ssr: false });

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white"
        style={{
          backgroundImage: "url('/images/slide.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div
            className="text-center max-w-3xl mx-auto"
            style={{ background: 'rgba(76, 92, 99, 0.58)', padding: 'clamp(1.875rem, 4vw, 2.8125rem)' }}
          >
            <h1 className="mc-page-hero-title mb-6 hero-fade-in-title">
              {dict.hero.title}
            </h1>
            <p className="mc-page-hero-subtitle mb-8 text-primary-100 hero-fade-in-subtitle">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScrollToServicesBtn
                label={dict.hero.ctaSecondary}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.services.title}
            </h2>
            <p className="text-xl text-gray-600">
              {dict.services.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {dict.common.learnMore}
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.whyChooseUs}
            </h2>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-primary-600 mb-4">Mr Clean+</h3>
            <p className="text-gray-600 leading-relaxed">{dict.about.companyDescription}</p>
          </div>
          
          <div className="mc-home-values-grid">
            {dict.about.values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{['🎯', '👥', '🌿', '✨'][index]}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
      <section className="py-0">
        <div className="relative w-full" style={{ height: '420px' }}>
          <CoverageMap lang={params.lang} />
          <div
            className="absolute bottom-0 left-0 right-0 text-white text-center py-3"
            style={{ background: 'rgba(2, 132, 199, 0.85)' }}
          >
            <p className="font-semibold">
              {params.lang === 'fr' ? '📍 Zones couvertes : Montréal, Laval, Rive-Nord et Rive-Sud' : '📍 Covered areas: Montreal, Laval, North Shore and South Shore'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {params.lang === 'fr' ? 'Prêt à avoir un espace impeccable?' : 'Ready for a Spotless Space?'}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {params.lang === 'fr' 
              ? 'Contactez-nous aujourd\'hui pour un devis gratuit et sans engagement.'
              : 'Contact us today for a free, no-obligation quote.'
            }
          </p>
          <Link
            href={`/${params.lang}/consult`}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            {dict.common.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}
