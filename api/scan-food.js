export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyse this food image and return ONLY a JSON object with these exact fields: { "food": "food name", "calories": number, "protein": number, "carbs": number, "fat": number, "serving": "estimated serving size" }. If you cannot identify food in the image return { "error": "No food detected" }. Return only the JSON, no other text.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                  detail: 'low',
                },
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: 'OpenAI API error', details: data });
    }

    const text = data.choices[0].message.content.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to analyse image', details: error.message });
  }
}