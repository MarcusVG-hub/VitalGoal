const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://fzueeikcgqlrhrsafhvj.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
);

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const EBOOK_MAP = {
  'price_1TYuLHCCF1YwJaAOROvyhW9r': {
    title: 'Hydration Mastery',
    file: 'VitalGoal-Hydration-Mastery.pdf',
  },
  'price_1TYuNVCCF1YwJaAOgeDuJ6jf': {
    title: 'Sleep Like a Pro',
    file: 'VitalGoal-Sleep-Like-A-Pro.pdf',
  },
  'price_1TYuObCCF1YwJaAOMKX84l4W': {
    title: 'Fat Loss Simplified',
    file: 'VitalGoal-Fat-Loss-Simplified.pdf',
  },
  'price_1TYuPLCCF1YwJaAO8rg29dbg': {
    title: 'Build Muscle at Home',
    file: 'VitalGoal-Build-Muscle-At-Home.pdf',
  },
  'price_1TYuQ3CCF1YwJaAOKARu6EQL': {
    title: '30 Day Glow Up Challenge',
    file: 'VitalGoal-30-Day-Glow-Up.pdf',
  },
  'price_1TYuQqCCF1YwJaAOH184fFtv': {
    title: 'Mental Clarity Blueprint',
    file: 'VitalGoal-Mental-Clarity-Blueprint.pdf',
  },
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { customerEmail, priceId } = req.body;

    if (!customerEmail || !priceId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = EBOOK_MAP[priceId];
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    // Generate a signed URL valid for 7 days
    const { data, error } = await supabase.storage
      .from('ebooks')
      .createSignedUrl(product.file, 604800);

    if (error) {
      console.error('Storage error:', error);
      return res.status(500).json({ error: 'Could not generate download link' });
    }

    const downloadUrl = data.signedUrl;

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'VitalGoal <onboarding@resend.dev>',
        to: customerEmail,
        subject: `Your VitalGoal purchase: ${product.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 40px 20px;">
            <div style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #1A7A4A; font-size: 28px; margin: 0;">⚡ VitalGoal</h1>
                <p style="color: #888; font-size: 14px; margin-top: 4px;">Your Health Journey Starts Here</p>
              </div>

              <h2 style="color: #222; font-size: 22px;">Your ebook is ready! 🎉</h2>
              
              <p style="color: #444; font-size: 16px; line-height: 1.6;">
                Thank you for your purchase! Your copy of <strong>${product.title}</strong> is ready to download.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${downloadUrl}" 
                   style="background: linear-gradient(135deg, #1A7A4A, #0E5C8A); 
                          color: white; 
                          padding: 16px 40px; 
                          border-radius: 12px; 
                          text-decoration: none; 
                          font-weight: bold; 
                          font-size: 18px;
                          display: inline-block;">
                  Download Your Ebook
                </a>
              </div>

              <div style="background: #E8F5EE; border-radius: 10px; padding: 16px; margin: 24px 0;">
                <p style="color: #1A7A4A; font-weight: bold; margin: 0 0 8px;">Important</p>
                <p style="color: #444; font-size: 14px; margin: 0;">This download link is valid for 7 days. Please save your ebook to your device after downloading.</p>
              </div>

              <p style="color: #444; font-size: 15px; line-height: 1.6;">
                Track your health journey daily with the VitalGoal app:
              </p>
              
              <div style="text-align: center; margin: 16px 0 32px;">
                <a href="https://getvitalgoal.com" 
                   style="color: #1A7A4A; font-weight: bold; font-size: 15px;">
                  Open VitalGoal App
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
              
              <p style="color: #888; font-size: 13px; text-align: center;">
                Questions? Reply to this email and we will help you out.<br/>
                2025 VitalGoal · getvitalgoal.com
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errData = await emailResponse.json();
      console.error('Resend error:', errData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
};