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
      const html = Object.entries(otherFields)
        .map(([k, v]) => `<p><strong>${k}:</strong> ${Array.isArray(v) ? v.join(', ') : v}</p>`)
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
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
