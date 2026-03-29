import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COACH_EMAIL = 'youcefbounabi@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      full_name,
      email,
      phone,
      height_cm,
      weight_kg,
      fitness_goal,
      health_conditions,
      coach_info,
      language,
    } = body;

    const { data, error } = await resend.emails.send({
      from: 'YouOtmani Coaching <onboarding@resend.dev>',
      to: [COACH_EMAIL],
      subject: `📋 Nouvelle demande de coaching — ${full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
          <h1 style="color: #c8a96e; font-size: 24px; margin-bottom: 8px;">Nouvelle Demande de Coaching</h1>
          <p style="color: #888; margin-bottom: 24px;">Soumis via le site YouOtmani Coaching</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888; width: 160px;">Nom complet</td>
              <td style="padding: 12px 0; font-weight: bold;">${full_name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #c8a96e;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Téléphone</td>
              <td style="padding: 12px 0;">${phone || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Taille</td>
              <td style="padding: 12px 0;">${height_cm ? `${height_cm} cm` : '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Poids</td>
              <td style="padding: 12px 0;">${weight_kg ? `${weight_kg} kg` : '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Objectif fitness</td>
              <td style="padding: 12px 0;">${fitness_goal}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Conditions médicales</td>
              <td style="padding: 12px 0;">${health_conditions || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Info supplémentaire</td>
              <td style="padding: 12px 0;">${coach_info || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888;">Langue</td>
              <td style="padding: 12px 0;">${language?.toUpperCase() || 'FR'}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #111; border-radius: 8px; border-left: 3px solid #c8a96e;">
            <p style="margin: 0; color: #888; font-size: 13px;">Les photos soumises sont stockées dans Supabase. Connectez-vous au dashboard pour les consulter.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
