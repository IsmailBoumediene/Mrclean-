import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import ContactForm from '@/components/ContactForm';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  };
}

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-slide-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mc-page-hero-title mb-4">
            {dict.contact.title}
          </h1>
          <p className="mc-page-hero-subtitle text-primary-100">
            {dict.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {dict.contact.info}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaPhone className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {dict.contact.phone}
                    </h3>
                    <a href="tel:+15144319741" className="text-gray-600 hover:text-primary-600">
                      +1(514)431-9741
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaEnvelope className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {dict.contact.email}
                    </h3>
                    <a href="mailto:monsieurcleanplus@gmail.com" className="text-gray-600 hover:text-primary-600">
                      monsieurcleanplus@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaClock className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {dict.contact.hours}
                    </h3>
                    <div 
                      className="text-gray-600" 
                      dangerouslySetInnerHTML={{ __html: dict.contact.hoursValue }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {dict.contact.serviceArea}
                    </h3>
                    <p className="text-gray-600">
                      {dict.contact.serviceAreaValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {dict.contact.form.title}
              </h2>
              <ContactForm dict={dict.contact.form} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
