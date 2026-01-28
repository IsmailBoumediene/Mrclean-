import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { FaHome, FaBuilding, FaKey, FaUsers, FaArrowRight } from 'react-icons/fa';

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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {dict.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${params.lang}/contact`}
                className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                {dict.hero.cta}
                <FaArrowRight />
              </Link>
              <Link
                href={`/${params.lang}/services`}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
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
            />
            <ServiceCard
              title={dict.services.commercial.title}
              description={dict.services.commercial.description}
              features={dict.services.commercial.features}
              icon={<FaBuilding />}
            />
            <ServiceCard
              title={dict.services.airbnb.title}
              description={dict.services.airbnb.description}
              features={dict.services.airbnb.features}
              icon={<FaKey />}
            />
            <ServiceCard
              title={dict.services.staffing.title}
              description={dict.services.staffing.description}
              features={dict.services.staffing.features}
              icon={<FaUsers />}
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.whyChooseUs}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            href={`/${params.lang}/contact`}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            {dict.common.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}
