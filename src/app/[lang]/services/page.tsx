import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import ServiceCard from '@/components/ServiceCard';
import { FaHome, FaBuilding, FaKey, FaUsers } from 'react-icons/fa';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  };
}

export default async function ServicesPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dict.services.title}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

          {/* CTA */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {params.lang === 'fr' ? 'Besoin d\'un devis personnalisé?' : 'Need a Custom Quote?'}
            </h2>
            <p className="text-gray-600 mb-6">
              {params.lang === 'fr' 
                ? 'Contactez-nous pour discuter de vos besoins spécifiques et obtenir un devis gratuit.'
                : 'Contact us to discuss your specific needs and get a free quote.'
              }
            </p>
            <Link
              href={`/${params.lang}/contact`}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
            >
              {dict.common.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
