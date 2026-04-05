import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import ConsultForm from '@/components/ConsultForm';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isFr = params.lang === 'fr';
  return {
    title: isFr ? 'Obtenir une soumission - Mr Clean+' : 'Get a Quote - Mr Clean+',
    description: isFr
      ? 'Obtenez une soumission rapide pour vos besoins de nettoyage résidentiel ou commercial.'
      : 'Get a quick quote for your residential or commercial cleaning needs.',
  };
}

export default async function ConsultPage({ params }: { params: { lang: Locale } }) {
  const isFr = params.lang === 'fr';

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
      success: isFr ? 'Soumission envoyée avec succès. Nous vous contacterons rapidement.' : 'Quote request sent successfully. We will contact you shortly.',
      error: isFr ? "Une erreur s'est produite. Veuillez réessayer." : 'An error occurred. Please try again.',
    },
  };

  return (
    <div>
      <section className="hero-slide-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mc-page-hero-title mb-4">{dict.title}</h1>
          <p className="mc-page-hero-subtitle text-primary-100">{dict.subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <ConsultForm dict={dict.form} />
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-8">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
