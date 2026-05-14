import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { buildBreadcrumbLd, buildPageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    lang: params.lang,
    route: 'contact',
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isFr = params.lang === 'fr';
  const breadcrumbLd = buildBreadcrumbLd({
    lang: params.lang,
    items: [
      { name: dict.nav.home, path: '' },
      { name: dict.nav.contact, path: '/contact' },
    ],
  });

  const contactItems = [
    { icon: <FaPhone />, label: dict.contact.phone, value: '+1 (514) 431-9741', href: 'tel:+15144319741' },
    { icon: <FaEnvelope />, label: dict.contact.email, value: 'info@mrcleanplus.ca', href: 'mailto:info@mrcleanplus.ca' },
    { icon: <FaClock />, label: dict.contact.hours, value: dict.contact.hoursValue, isHtml: true },
    { icon: <FaMapMarkerAlt />, label: dict.contact.serviceArea, value: dict.contact.serviceAreaValue },
  ];

  return (
    <div className="mc-inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="hero-slide-bg mc-inner-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mc-eyebrow mc-eyebrow-on-dark">{isFr ? 'Contact' : 'Contact'}</span>
          <h1 className="mc-page-hero-title mb-4">{dict.contact.title}</h1>
          <p className="mc-page-hero-subtitle">{dict.contact.subtitle}</p>
        </div>
      </section>

      <section className="mc-inner-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mc-contact-grid">
            <div className="mc-contact-info">
              <span className="mc-eyebrow">{isFr ? 'Coordonnées' : 'Reach us'}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {dict.contact.info}
              </h2>

              <div className="mc-contact-list">
                {contactItems.map((item, i) => (
                  <div key={i} className="mc-contact-item">
                    <span className="mc-contact-item-icon" aria-hidden="true">{item.icon}</span>
                    <div className="mc-contact-item-body">
                      <h3 className="mc-contact-item-label">{item.label}</h3>
                      {item.href ? (
                        <a href={item.href} className="mc-contact-item-value mc-contact-item-link">{item.value}</a>
                      ) : item.isHtml ? (
                        <div className="mc-contact-item-value" dangerouslySetInnerHTML={{ __html: item.value }} />
                      ) : (
                        <p className="mc-contact-item-value">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mc-contact-form-wrap">
              <span className="mc-eyebrow">{isFr ? 'Écrivez-nous' : 'Send us a message'}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
