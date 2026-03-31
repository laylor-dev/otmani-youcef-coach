import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COACH_EMAIL = 'youcef.otmani.pt@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, wilaya, notes, productName, type, quantity } = body;

    const isProduct = type === 'product';
    const accentColor = isProduct ? '#FF6B00' : '#FF2A2A';

    const { data, error } = await resend.emails.send({
      from: 'YouOtmani Coaching <onboarding@resend.dev>',
      to: [COACH_EMAIL],
      subject: `🛒 Nouvelle ${isProduct ? 'Commande Produit' : 'Demande Coaching'} — ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
          <h1 style="color: ${accentColor}; font-size: 24px; margin-bottom: 8px;">Nouvelle ${isProduct ? 'Commande' : 'Intention'}</h1>
          <p style="color: #888; margin-bottom: 24px;">Produit / Service : <strong style="color: white;">${productName}</strong></p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888; width: 160px;">Nom complet</td>
              <td style="padding: 12px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Téléphone</td>
              <td style="padding: 12px 0;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Wilaya</td>
              <td style="padding: 12px 0;">${wilaya}</td>
            </tr>
            ${isProduct ? `
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #888;">Quantité</td>
              <td style="padding: 12px 0; font-weight: bold; color: ${accentColor};">${quantity}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; color: #888;">Notes</td>
              <td style="padding: 12px 0; white-space: pre-wrap;">${notes || "—"}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Order Route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
