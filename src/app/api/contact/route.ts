import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'VOTRE_CLE_API_RENVOYER_ICI');

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      // Parse FormData
      const formData = await req.formData();
      const fields: Record<string, any> = {};
      const attachments: any[] = [];
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          attachments.push({
            filename: value.name,
            content: Buffer.from(await value.arrayBuffer()),
          });
        } else {
          // Pour les champs multiples (ex: services[]), concaténer
          if (fields[key]) {
            if (Array.isArray(fields[key])) {
              fields[key].push(value);
            } else {
              fields[key] = [fields[key], value];
            }
          } else {
            fields[key] = value;
          }
        }
      }
      const { subject, ...otherFields } = fields;
      // Traduction des valeurs de housingType en français
      const housingTypeMap: Record<string, string> = {
        twoHalf: '2 et demi',
        threeHalf: '3 et demi',
        fourHalf: '4 et demi',
        fiveHalf: '5 et demi',
        condo: 'Condo',
        house: 'Maison',
      };
      const servicesMap: Record<string, string> = {
        residential: 'Nettoyage résidentiel régulier',
        deepCleaning: 'Grand ménage',
        commercial: 'Nettoyage commercial',
        moveRenovation: 'Nettoyage après construction et déménagement',
        airbnb: 'Nettoyage Airbnb',
        staffing: 'Personnel d’entretien dédié',
      };
      const frequencyMap: Record<string, string> = {
        oneTime: 'Ponctuel',
        weekly: 'Hebdomadaire',
        biweekly: 'Aux deux semaines',
        monthly: 'Mensuel',
      };
      const visitPreferenceMap: Record<string, string> = {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
      };
      // Traduction des labels de champs en français
      const fieldLabelMap: Record<string, string> = {
        companyName: 'Nom de la compagnie',
        lastName: 'Nom',
        firstName: 'Prénom',
        email: 'Courriel',
        phone: 'Numéro de téléphone',
        city: 'Ville',
        postalCode: 'Code postal',
        housingType: 'Type de logement',
        floors: 'Étages',
        bedrooms: 'Chambres',
        services: 'Service',
        visitPreference: 'Préférence de visite',
        frequency: 'Fréquence',
        oneTimeVisitsPerWeek: 'Visites ponctuelles/semaine',
        additionalInfo: 'Informations complémentaires',
      };
      const html = Object.entries(otherFields)
        .map(([k, v]) => {
          // Traduction des valeurs pour certains champs
          if (k === 'housingType' && typeof v === 'string' && housingTypeMap[v]) {
            return `<p><strong>${fieldLabelMap[k] || k}:</strong> ${housingTypeMap[v]}</p>`;
          }
          if (k === 'services' && typeof v === 'string' && servicesMap[v]) {
            return `<p><strong>${fieldLabelMap[k] || k}:</strong> ${servicesMap[v]}</p>`;
          }
          if (k === 'frequency' && typeof v === 'string' && frequencyMap[v]) {
            return `<p><strong>${fieldLabelMap[k] || k}:</strong> ${frequencyMap[v]}</p>`;
          }
          if (k === 'visitPreference') {
            if (Array.isArray(v)) {
              // Ordre des jours de la semaine
              const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
              const sorted = v.slice().sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
              const translated = sorted.map((item) => visitPreferenceMap[item] || item).join(', ');
              return `<p><strong>${fieldLabelMap[k] || k}:</strong> ${translated}</p>`;
            } else if (typeof v === 'string' && visitPreferenceMap[v]) {
              return `<p><strong>${fieldLabelMap[k] || k}:</strong> ${visitPreferenceMap[v]}</p>`;
            }
          }
          return `<p><strong>${fieldLabelMap[k] || k}:</strong> ${Array.isArray(v) ? v.join(', ') : v}</p>`;
        })
        .join('');
      await resend.emails.send({
        from: 'info@mrcleanplus.ca',
        to: 'info@mrcleanplus.ca',
        subject: subject || 'Nouveau message formulaire',
        html,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      return NextResponse.json({ success: true });
    } else {
      // Fallback JSON (ContactForm)
      const data = await req.json();
      const { subject, ...fields } = data;
      const html = Object.entries(fields)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');
      await resend.emails.send({
        from: 'info@mrcleanplus.ca',
        to: 'info@mrcleanplus.ca',
        subject: subject || 'Nouveau message formulaire',
        html,
      });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
