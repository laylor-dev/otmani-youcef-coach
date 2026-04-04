import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COACH_EMAIL = 'youcef.otmani.pt@gmail.com';

const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const rlData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - rlData.lastReset > RATE_LIMIT_WINDOW) {
      rlData.count = 1;
      rlData.lastReset = now;
    } else {
      rlData.count += 1;
    }
    rateLimitMap.set(ip, rlData);

    if (rlData.count > MAX_REQUESTS) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const {
      name,
      email,
      whatsapp,
      age,
      gender,
      country,
      weight,
      height,
      goal,
      activity,
      healthConditions,
      notes,
      plan,
      photo_front,
      photo_side,
      photo_back,
      address2
    } = body;

    if (address2) {
      // Honeypot field filled - act like it succeeded to fool bot
      return NextResponse.json({ success: true, id: 'fake_id' });
    }

    const { data, error } = await resend.emails.send({
      from: 'YouOtmani Coaching <onboarding@resend.dev>',
      to: [COACH_EMAIL],
      subject: `📋 Nouvelle demande de coaching — ${name || 'Nouveau Client'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
          <h1 style="color: #FF2A2A; font-size: 24px; margin-bottom: 8px;">Nouvelle Demande de Coaching</h1>
          <p style="color: #888; margin-bottom: 24px;">Soumis via le site YouOtmani Coaching</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888; width: 160px;">Nom complet</td>
              <td style="padding: 12px 0; font-weight: bold; color: #fff;">${name || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #FF2A2A;">${email || '—'}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">WhatsApp</td>
              <td style="padding: 12px 0; color: #fff;">${whatsapp || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Âge & Genre</td>
              <td style="padding: 12px 0; color: #fff;">${age ? `${age} ans` : '—'} / ${gender === 'male' ? 'Homme' : gender === 'female' ? 'Femme' : '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Pays</td>
              <td style="padding: 12px 0; color: #fff;">${country || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Taille & Poids</td>
              <td style="padding: 12px 0; color: #fff;">${height ? `${height} cm` : '—'} / ${weight ? `${weight} kg` : '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Besoins</td>
              <td style="padding: 12px 0; color: #fff;">Objectif: ${goal || '—'} | Activité: ${activity || '—'} | Plan: ${plan || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Conditions médicales</td>
              <td style="padding: 12px 0; color: #fff;">${healthConditions || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888;">Notes supplémentaires</td>
              <td style="padding: 12px 0; color: #fff;">${notes || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #111; border-radius: 8px; border-left: 3px solid #FF2A2A;">
            <p style="margin: 0 0 16px 0; color: #fff; font-size: 16px; font-weight: bold;">Photos du Client :</p>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              ${photo_front ? `
                <div style="flex: 1; min-width: 120px;">
                  <p style="color: #888; font-size: 12px; margin: 0 0 8px 0;">De Face</p>
                  <a href="${photo_front}" target="_blank">
                    <img src="${photo_front}" alt="Face" style="width: 100%; border-radius: 4px; border: 1px solid #222;" />
                  </a>
                </div>
              ` : ''}
              ${photo_side ? `
                <div style="flex: 1; min-width: 120px;">
                  <p style="color: #888; font-size: 12px; margin: 0 0 8px 0;">De Profil</p>
                  <a href="${photo_side}" target="_blank">
                    <img src="${photo_side}" alt="Profil" style="width: 100%; border-radius: 4px; border: 1px solid #222;" />
                  </a>
                </div>
              ` : ''}
              ${photo_back ? `
                <div style="flex: 1; min-width: 120px;">
                  <p style="color: #888; font-size: 12px; margin: 0 0 8px 0;">De Dos</p>
                  <a href="${photo_back}" target="_blank">
                    <img src="${photo_back}" alt="Dos" style="width: 100%; border-radius: 4px; border: 1px solid #222;" />
                  </a>
                </div>
              ` : ''}
              ${!photo_front && !photo_side && !photo_back ? '<p style="color: #888; font-size: 13px;">Aucune photo fournie.</p>' : ''}
            </div>
            <p style="margin: 16px 0 0 0; color: #888; font-size: 12px;">(Cliquez sur une image pour l'ouvrir en taille réelle)</p>
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
