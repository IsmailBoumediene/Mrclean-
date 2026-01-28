import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import CareerForm from '@/components/CareerForm';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.careers.title,
    description: dict.meta.careers.description,
  };
}

export default async function CareersPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dict.careers.title}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {dict.careers.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 mb-12">
            {dict.careers.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Benefits */}
            <div className="bg-accent-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {dict.careers.benefits}
              </h2>
              <ul className="space-y-3">
                {dict.careers.benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent-500 text-xl">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {dict.careers.requirements}
              </h2>
              <ul className="space-y-3">
                {dict.careers.requirementsList.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-500 text-xl">•</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {dict.careers.form.title}
            </h2>
            <CareerForm dict={dict.careers.form} />
          </div>
        </div>
      </section>
    </div>
  );
}
