import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COACH_EMAIL = 'youcef.otmani.pt@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone, goal, why_you } = body;

    console.log('📧 Contact form submission:', { first_name, last_name, phone, email, goal });

    const { data, error } = await resend.emails.send({
      from: 'YouOtmani Coaching <onboarding@resend.dev>',
      to: [COACH_EMAIL],
      replyTo: email || undefined,
      subject: `✉️ Nouveau contact — ${first_name} ${last_name} (${phone})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
          <h1 style="color: #FF2A2A; font-size: 24px; margin-bottom: 8px;">Nouveau Message de Contact</h1>
          <p style="color: #888; margin-bottom: 24px;">Soumis via la page Contact du site</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888; width: 160px;">Nom</td>
              <td style="padding: 12px 0; font-weight: bold;">${first_name} ${last_name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Téléphone</td>
              <td style="padding: 12px 0; font-weight: bold; color: #FF2A2A;">${phone || 'Non spécifié'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #FF2A2A;">${email || 'Non spécifié'}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Objectif</td>
              <td style="padding: 12px 0;">${goal || 'Non spécifié'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888;">Message</td>
              <td style="padding: 12px 0; white-space: pre-wrap;">${why_you || '—'}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend error:', JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('✅ Email sent successfully, id:', data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('❌ Contact Route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
