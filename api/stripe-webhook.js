import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const session = event.data.object;

  // Guide purchased — send ebook
  if (event.type === 'checkout.session.completed') {
    const customerEmail = session.customer_details?.email;
    const priceId = session.line_items?.data?.[0]?.price?.id;

    // Guide price IDs
    const guideMap = {
      'price_1Tb4iBCCF1YwJaAOQ5IQeje7': 'VitalGoal-Hydration-Mastery.pdf',
      'price_1Tb4jCCCF1YwJaAOJZtyB3RA': 'VitalGoal-Sleep-Like-A-Pro.pdf',
      'price_1Tb4jxCCF1YwJaAOih7AyacA': 'VitalGoal-Fat-Loss-Simplified.pdf',
      'price_1Tb4ksCCF1YwJaAOCcB8JMSK': 'VitalGoal-Build-Muscle-At-Home.pdf',
      'price_1Tb4lYCCF1YwJaAOea2dOEAQ': 'VitalGoal-30-Day-Glow-Up.pdf',
      'price_1Tb4mOCCF1YwJaAOHexYANJO': 'VitalGoal-Mental-Clarity-Blueprint.pdf',
    };

    if (guideMap[priceId]) {
      await sendGuide(customerEmail, guideMap[priceId]);
    }

    // Premium subscription started
    const premiumPriceIds = [
      'price_1TaHpnCCF1YwJaAO0ZcGJLQQ', // monthly old
      'price_1TaL66CCF1YwJaAOasT8QRO3',  // annual old
      'price_1TbGl7CCF1YwJaAOlbkXhBr3',  // annual new €89.99
      'price_1TbGuUCCF1YwJaAOyeoKhD7p',  // quarterly €39.99
      'price_1TbGzgCCF1YwJaAOruNatGI3',  // quarterly new €34.99
    ];

    if (premiumPriceIds.includes(priceId)) {
      await setPremium(customerEmail, true);
    }
  }

  // Subscription cancelled or payment failed — remove premium
  if (
    event.type === 'customer.subscription.deleted' ||
    event.type === 'invoice.payment_failed'
  ) {
    const customerEmail = await getEmailFromCustomer(session.customer);
    await setPremium(customerEmail, false);
  }

  return res.status(200).json({ received: true });
}

async function setPremium(email, value) {
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (user) {
    await supabase
      .from('profiles')
      .update({ is_premium: value })
      .eq('id', user.id);
  }
}

async function getEmailFromCustomer(customerId) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer.email;
}

async function sendGuide(email, filename) {
  const { data } = await supabase.storage
    .from('ebooks')
    .createSignedUrl(filename, 60 * 60 * 24);

  if (!data?.signedUrl) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'VitalGoal <onboarding@resend.dev>',
      to: email,
      subject: '📚 Your VitalGoal Guide is Ready!',
      html: `
        <h2>Your guide is ready! 🎉</h2>
        <p>Thank you for your purchase. Click the link below to download your guide:</p>
        <a href="${data.signedUrl}" style="background:#1B7A3E;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:16px 0;">Download Your Guide</a>
        <p>This link expires in 24 hours.</p>
        <p>The VitalGoal Team</p>
      `,
    }),
  });
}

export const config = {
  api: { bodyParser: false },
};