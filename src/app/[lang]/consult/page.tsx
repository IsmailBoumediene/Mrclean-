import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import ConsultForm from '@/components/ConsultForm';
import { buildBreadcrumbLd, buildPageMetadata } from '@/lib/seo';
import { getDictionary } from '@/lib/i18n/getDictionary';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isFr = params.lang === 'fr';
  return buildPageMetadata({
    lang: params.lang,
    route: 'consult',
    title: isFr ? 'Obtenir une soumission - Mr Clean+' : 'Get a Quote - Mr Clean+',
    description: isFr
      ? 'Obtenez une soumission rapide pour vos besoins de nettoyage résidentiel ou commercial.'
      : 'Get a quick quote for your residential or commercial cleaning needs.',
  });
}

export default async function ConsultPage({ params }: { params: { lang: Locale } }) {
  const isFr = params.lang === 'fr';
  const commonDict = await getDictionary(params.lang);
  const breadcrumbLd = buildBreadcrumbLd({
    lang: params.lang,
    items: [
      { name: commonDict.nav.home, path: '' },
      { name: commonDict.common.getQuote, path: '/consult' },
    ],
  });

  const dict = {
    title: isFr ? 'OBTENIR UNE SOUMISSION' : 'GET A QUOTE',
    subtitle: isFr ? 'Obtenez une soumission rapide et gratuite' : 'Get a quick quote!',
    contactTitle: isFr ? 'NOUS CONTACTER' : 'CONTACT US',
    location: isFr ? '315 René-Lévesque Est H2X 3P3, Montréal QC, Canada' : '315 Rene-Levesque Est H2X 3P3, Montreal QC, Canada',
    email: 'info@mrcleanplus.ca',
    phone: '+1(514)431-9741',
    form: {
      companyName: isFr ? "Nom d'entreprise (optionnel)" : 'Company name (optional)',
      lastName: isFr ? 'Nom' : 'Last name',
      firstName: isFr ? 'Prénom' : 'First name',
      email: isFr ? 'Courriel' : 'Email',
      phone: isFr ? 'Téléphone' : 'Phone',
      city: isFr ? 'Ville' : 'City',
      postalCode: isFr ? 'Code postal' : 'Postal code',
      housingType: isFr ? 'Type de logement' : 'Type of housing',
      housingTypeOptions: {
        twoHalf: isFr ? '2 et demi' : '2 1/2',
        threeHalf: isFr ? '3 et demi' : '3 1/2',
        fourHalf: isFr ? '4 et demi' : '4 1/2',
        fiveHalf: isFr ? '5 et demi' : '5 1/2',
        condo: isFr ? 'Condo' : 'Condo',
        house: isFr ? 'Maison' : 'House',
      },
      floors: isFr ? "Combien d'étages" : 'How many floors',
      bedrooms: isFr ? 'Combien de chambres' : 'How many bedrooms',
      services: isFr ? 'Service(s) recherché(s)' : 'Requested service(s)',
      serviceOptions: {
        residential: isFr ? 'Nettoyage résidentiel régulier' : 'Regular residential cleaning',
        commercial: isFr ? 'Nettoyage Commercial' : 'Commercial cleaning',
        airbnb: isFr ? 'Nettoyage Airbnb' : 'Airbnb cleaning',
        deepCleaning: isFr ? 'Grand ménage' : 'Deep cleaning',
        moveRenovation: isFr ? 'Nettoyage après construction et déménagement' : 'Post-construction and move-out cleaning',
        staffing: isFr ? 'Personnel d\'entretien dédié' : 'Dedicated maintenance staff',
      },
      visitPreference: isFr ? 'Préférence de passage (2 choix ou plus)' : 'Visit preference (2 choices or more)',
      visitPreferenceOptions: {
        monday: isFr ? 'Lundi' : 'Monday',
        tuesday: isFr ? 'Mardi' : 'Tuesday',
        wednesday: isFr ? 'Mercredi' : 'Wednesday',
        thursday: isFr ? 'Jeudi' : 'Thursday',
        friday: isFr ? 'Vendredi' : 'Friday',
        saturday: isFr ? 'Samedi' : 'Saturday',
      },
      frequency: isFr ? 'Fréquence de service' : 'Service frequency',
      frequencyOptions: {
        oneTime: isFr ? 'Ponctuel' : 'One-time',
        weekly: isFr ? 'Hebdomadaire' : 'Weekly',
        biweekly: isFr ? 'Aux deux semaines' : 'Bi-weekly',
        monthly: isFr ? 'Mensuel' : 'Monthly',
      },
      oneTimeVisitsPerWeek: isFr ? 'Combien de passages par semaine' : 'How many visits per week',
      photos: isFr ? 'Photos (optionnel)' : 'Photos (optional)',
      photosAction: isFr ? 'Prendre une photo ou téléverser une image' : 'Take a photo or upload an image',
      photosChoiceTitle: isFr ? 'Ajouter une photo' : 'Add a photo',
      photosOptionUpload: isFr ? 'Téléverser une image' : 'Upload an image',
      photosOptionCamera: isFr ? 'Prendre une photo' : 'Take a photo',
      photosOptionCancel: isFr ? 'Annuler' : 'Cancel',
      photosHelp: isFr ? 'Ajoutez jusqu\'à 3 photos. Vous pouvez téléverser des images ou en prendre avec votre appareil.' : 'Add up to 3 photos. You can upload images or take them with your device.',
      photosErrorMax: isFr ? 'Maximum 3 photos autorisées.' : 'Maximum 3 photos allowed.',
      additionalInfo: isFr ? 'Informations supplémentaires' : 'Additional information',
      submit: isFr ? 'Envoyer' : 'Submit',
      success: isFr ? 'Votre demande de soumission a été envoyée avec succès. Notre équipe vous contactera dans les plus brefs délais.' : 'Your quote request has been sent successfully. Our team will contact you as soon as possible.',
      error: isFr ? "Une erreur s'est produite. Veuillez réessayer." : 'An error occurred. Please try again.',
    },
  };

  return (
    <div className="mc-inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="hero-slide-bg mc-inner-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mc-eyebrow mc-eyebrow-on-dark">{isFr ? 'Soumission gratuite' : 'Free quote'}</span>
          <h1 className="mc-page-hero-title mb-4">{dict.title}</h1>
          <p className="mc-page-hero-subtitle">{dict.subtitle}</p>
        </div>
      </section>

      <section className="mc-inner-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mc-promo-banner" role="note">
            <div className="mc-promo-banner-badge" aria-hidden="true">
              <span className="mc-promo-banner-pct">20%</span>
              <span className="mc-promo-banner-pct-label">OFF</span>
            </div>
            <div className="mc-promo-banner-body">
              <h2 className="mc-promo-banner-title">
                {isFr ? 'Offre de bienvenue · Nouveaux clients' : 'Welcome offer · New clients'}
              </h2>
              <p className="mc-promo-banner-text">
                {isFr
                  ? 'Remplissez le formulaire et économisez 20% sur votre premier nettoyage régulier. Aucune carte requise, aucune obligation.'
                  : 'Fill in the form and save 20% on your first regular cleaning. No card required, no obligation.'}
              </p>
              <ul className="mc-promo-banner-perks">
                <li>{isFr ? 'Devis en quelques minutes' : 'Quote in minutes'}</li>
                <li>{isFr ? 'Équipe vérifiée' : 'Verified team'}</li>
                <li>{isFr ? 'Satisfaction garantie' : 'Satisfaction guaranteed'}</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mc-consult-form-card">
              <ConsultForm dict={dict.form} />
            </div>

            <div className="space-y-6">
              <div className="mc-consult-aside-card">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{dict.contactTitle}</h3>
                <div className="space-y-2 text-gray-700">
                  <p>{dict.location}</p>
                  <p>
                    <a href={`mailto:${dict.email}`} className="text-primary-600 hover:text-primary-700">{dict.email}</a>
                  </p>
                  <p>
                    <a href="tel:+15144319741" className="text-primary-600 hover:text-primary-700">{dict.phone}</a>
                  </p>
                </div>
              </div>

              <div className="mc-consult-trust-card">
                <p className="mc-consult-trust-lede">
                  {isFr ? "Pourquoi nous?" : 'Why choose us?'}
                </p>
                <ul className="mc-consult-trust-list">
                  <li>✓ {isFr ? '+100 mandats complétés' : '100+ jobs completed'}</li>
                  <li>✓ {isFr ? '99% clients satisfaits' : '99% satisfied clients'}</li>
                  <li>✓ {isFr ? 'Réponse rapide, sans engagement' : 'Quick reply, no obligation'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
