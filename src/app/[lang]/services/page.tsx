import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import Link from 'next/link';
import Image from 'next/image';
import residentialBg from '@/images/Residentiel.png';
import commercialBg from '@/images/Commercial.png';
import deepCleaningBg from '@/images/Grand-menage-new.jpg';
import airbnbBg from '@/images/airbnb.png';
import staffingBg from '@/images/Personnage.png';
import afterConstructionBg from '@/images/Apres construction.png';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  };
}

export default async function ServicesPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isFr = params.lang === 'fr';

  const regularCleaningDetails = isFr ? [
    {
      heading: 'Cuisine',
      items: [
        'Comptoirs',
        'Tables',
        'Éviers de cuisine',
        'Meubles (extérieur)',
        'Électroménagers (extérieur)',
        'Plinthes',
        'Micro-ondes (intérieur et extérieur)',
      ],
    },
    {
      heading: 'Salle de bain',
      items: [
        'Bains/douches',
        'Toilettes + pied de toilette',
        'Miroirs',
        'Comptoir',
        'Lavabo et surface du meuble',
      ],
    },
    {
      heading: 'Salon et chambres',
      items: [
        'Meubles (époussetage)',
        'Bureaux (époussetage)',
        'Miroirs',
        'Plinthes',
      ],
    },
    {
      heading: 'Extra (sur demande, en supplément)',
      items: [
        'Préparation des lits',
        'Nettoyage intérieur du four',
        'Nettoyage du réfrigérateur',
        'Nettoyage des armoires de cuisine',
      ],
    },
  ] : [
    {
      heading: 'Kitchen',
      items: [
        'Countertops',
        'Tables',
        'Dining table',
        'Kitchen faucets / handles',
        'Cabinets (exterior)',
        'Appliances (exterior)',
        'Baseboards',
        'Microwave (interior and exterior)',
      ],
    },
    {
      heading: 'Bathroom',
      items: [
        'Bathtub / shower',
        'Toilet + toilet base',
        'Mirrors',
        'Countertop',
        'Sink (cabinet exterior)',
      ],
    },
    {
      heading: 'Living room & bedrooms',
      items: [
        'Furniture (dust)',
        'Desks (dust)',
        'Mirrors',
        'Baseboards',
      ],
    },
    {
      heading: 'Extra (on request, additional fee)',
      items: [
        'Bed preparation',
        'Interior oven cleaning',
        'Refrigerator cleaning',
        'Kitchen cabinet cleaning',
      ],
    },
  ];

  return (
    <div className="mc-services-page">
      {/* Hero Section */}
      <section className="hero-slide-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mc-page-hero-title mb-4">
            {dict.services.title}
          </h1>
          <p className="mc-page-hero-subtitle text-primary-100">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Detailed Section */}
      <section className="py-16 bg-white mc-services-detail-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="text-center mb-16 max-w-3xl mx-auto mc-services-intro">
            <p className="text-lg text-gray-600 leading-relaxed">
              {params.lang === 'fr' 
                ? 'Découvrez notre gamme complète de services de nettoyage résidentiel et commercial. Que vous ayez besoin d\'un entretien régulier, d\'un grand ménage en profondeur ou de services spécialisés, notre équipe est prête à transformer vos espaces en environnements impeccables.'
                : 'Discover our complete range of residential and commercial cleaning services. Whether you need regular maintenance, deep cleaning, or specialized services, our team is ready to transform your spaces into spotless environments.'}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-3">
              <u>{params.lang === 'fr' ? 'Tous nos services sont entièrement personnalisables selon vos besoins et vos horaires.' : 'All our services are fully customizable to fit your needs and schedule.'}</u>
            </p>
          </div>

          {/* Service 1: Residential */}
          <div id="service-regular-cleaning" className="mc-service-detail-row mc-service-detail-row-regular mt-8">
            <div className="mc-service-detail-content">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mc-service-detail-title">
                {isFr ? 'MÉNAGE RÉGULIER' : 'REGULAR CLEANING'}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed mc-service-detail-description">
                {dict.services.residential.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mc-service-detail-subtitle">
                {isFr ? 'Ce qui est inclus :' : 'What\'s included:'}
              </h3>
              <div className="mb-8 mc-service-detail-list mc-regular-cleaning-grid">
                {regularCleaningDetails.map((section) => (
                  <div key={section.heading} className="mc-regular-cleaning-section">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 mc-regular-cleaning-heading">{section.heading}</h4>
                    <ul className="space-y-2 mc-regular-cleaning-items">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-700 mc-service-detail-list-item">
                          <span className="text-primary-600 font-bold mt-1">•</span>
                          <span>&nbsp;{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href={`/${params.lang}/consult`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block mc-service-detail-cta"
              >
                {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
              </Link>
            </div>
            <div className="mc-service-detail-image mc-service-detail-image-regular">
              <Image
                src={residentialBg}
                alt={dict.services.residential.title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full mc-service-detail-image-regular-media"
              />
            </div>
          </div>

          {/* Service 2: Deep Cleaning */}
          <div id="service-deep-cleaning" className="mc-service-detail-row mc-service-detail-row-reverse mc-service-detail-row-regular">
            <div className="mc-service-detail-content">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mc-service-detail-title">
                {dict.services.airbnb.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed mc-service-detail-description">
                {dict.services.airbnb.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mc-service-detail-subtitle">
                {isFr ? 'Ce qui est inclus :' : 'What\'s included:'}
              </h3>
              <ul className="space-y-2 mb-6 mc-service-detail-list">
                {dict.services.airbnb.features.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 mc-service-detail-list-item">
                    <span className="text-primary-600 font-bold mt-1">•</span>
                    <span className={isFr && index === 0 ? 'font-bold underline underline-offset-4 decoration-2' : ''}>&nbsp;{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${params.lang}/consult`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block mc-service-detail-cta mt-6"
              >
                {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
              </Link>
            </div>
            <div className="mc-service-detail-image">
              <Image
                src={deepCleaningBg}
                alt={dict.services.airbnb.title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full mc-service-detail-image-regular-media"
              />
            </div>
          </div>

          {/* Service 3: Commercial */}
          <div id="service-commercial" className="mc-service-detail-row">
            <div className="mc-service-detail-content">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mc-service-detail-title">
                {dict.services.commercial.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed mc-service-detail-description">
                {dict.services.commercial.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mc-service-detail-subtitle">
                {params.lang === 'fr' ? 'Ce qui est inclus :' : 'What\'s included:'}
              </h3>
              <ul className="space-y-2 mb-8 mc-service-detail-list">
                {dict.services.commercial.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 mc-service-detail-list-item">
                    <span className="text-primary-600 font-bold mt-1">•</span>
                    <span>&nbsp;{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${params.lang}/consult`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block mc-service-detail-cta"
              >
                {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
              </Link>
            </div>
            <div className="mc-service-detail-image">
              <Image
                src={commercialBg}
                alt={dict.services.commercial.title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full mc-service-detail-image-regular-media"
              />
            </div>
          </div>

          {/* Service 4: Move-out and Post-renovation */}
          <div id="service-move-renovation" className="mc-service-detail-row mc-service-detail-row-reverse">
            <div className="mc-service-detail-content">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mc-service-detail-title">
                {dict.services.moveRenovation.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed mc-service-detail-description">
                {dict.services.moveRenovation.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mc-service-detail-subtitle">
                {params.lang === 'fr' ? 'Ce qui est inclus :' : 'What\'s included:'}
              </h3>
              <ul className="space-y-2 mb-8 mc-service-detail-list">
                {dict.services.moveRenovation.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 mc-service-detail-list-item">
                    <span className="text-primary-600 font-bold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${params.lang}/consult`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block mc-service-detail-cta"
              >
                {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
              </Link>
            </div>
            <div className="mc-service-detail-image">
              <Image
                src={afterConstructionBg}
                alt={dict.services.moveRenovation.title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full mc-service-detail-image-regular-media"
              />
            </div>
          </div>

          {/* Service 5: Airbnb Cleaning */}
          <div id="service-airbnb-cleaning" className="mc-service-detail-row">
            <div className="mc-service-detail-content">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mc-service-detail-title">
                {dict.services.airbnbCleaning.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed mc-service-detail-description">
                {dict.services.airbnbCleaning.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mc-service-detail-subtitle">
                {params.lang === 'fr' ? 'Ce qui est inclus :' : 'What\'s included:'}
              </h3>
              <ul className="space-y-2 mb-8 mc-service-detail-list">
                {dict.services.airbnbCleaning.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 mc-service-detail-list-item">
                    <span className="text-primary-600 font-bold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${params.lang}/consult`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block mc-service-detail-cta"
              >
                {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
              </Link>
            </div>
            <div className="mc-service-detail-image">
              <Image
                src={airbnbBg}
                alt={dict.services.airbnbCleaning.title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full mc-service-detail-image-regular-media"
              />
            </div>
          </div>

          {/* Service 6: Staffing */}
          <div id="service-staffing" className="mc-service-detail-row mc-service-detail-row-reverse">
            <div className="mc-service-detail-content">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mc-service-detail-title">
                {dict.services.staffing.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed mc-service-detail-description">
                {dict.services.staffing.description}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mc-service-detail-subtitle">
                {params.lang === 'fr' ? 'Ce qui est inclus :' : 'What\'s included:'}
              </h3>
              <ul className="space-y-2 mb-8 mc-service-detail-list">
                {dict.services.staffing.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 mc-service-detail-list-item">
                    <span className="text-primary-600 font-bold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${params.lang}/consult`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block mc-service-detail-cta"
              >
                {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
              </Link>
            </div>
            <div className="mc-service-detail-image">
              <Image
                src={staffingBg}
                alt={dict.services.staffing.title}
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full mc-service-detail-image-regular-media"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16 mc-services-final-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {params.lang === 'fr' ? 'Prêt à commencer?' : 'Ready to get started?'}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {params.lang === 'fr' 
              ? 'Contactez-nous aujourd\'hui pour un devis gratuit et sans engagement.'
              : 'Contact us today for a free, no-obligation quote.'}
          </p>
          <Link
            href={`/${params.lang}/consult`}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block mc-services-final-cta-btn"
          >
            {params.lang === 'fr' ? 'Obtenir une soumission' : dict.common.getQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}
