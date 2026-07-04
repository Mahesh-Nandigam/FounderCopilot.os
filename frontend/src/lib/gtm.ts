export const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/7ay9schjh5hwt75b4mzfa8v0bxnyxm1b';

export interface CampaignContent {
  linkedin: string;
  twitter: string;
  blog: string;
  imagePrompt: string | null;
}

export const generateCampaignContent = async (
  topic: string, 
  audience: string, 
  tone: string
): Promise<CampaignContent> => {
  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          {
            role: "system",
            content: `You are an elite Silicon Valley marketing expert. Generate a highly engaging social media campaign for 3 platforms: LinkedIn, Twitter, and a Company Blog.
Return your response ONLY as a raw JSON object with no markdown formatting. The JSON must exactly match this structure:
{
  "linkedin": "A professional, engaging LinkedIn post (include emojis and hashtags)",
  "twitter": "A punchy, viral-style Twitter thread or single post under 280 chars",
  "blog": "A short, compelling blog post intro/outline (2-3 paragraphs)",
  "imagePrompt": "A highly descriptive, creative prompt for an AI image generator to create the perfect companion image for this post. If no image is needed, return null."
}
Do not wrap the JSON in \`\`\`json or include any conversational text.`
          },
          {
            role: "user",
            content: `Topic/Product: ${topic}\nTarget Audience: ${audience}\nTone: ${tone}`
          }
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from LLM API");
    }

    const data = await response.json();
    let rawText = data.choices[0].message.content.trim();
    if (rawText.startsWith('```json')) rawText = rawText.slice(7);
    if (rawText.startsWith('```')) rawText = rawText.slice(3);
    if (rawText.endsWith('```')) rawText = rawText.slice(0, -3);

    return JSON.parse(rawText.trim()) as CampaignContent;
  } catch (err) {
    console.error("GTM Generation Error:", err);
    throw err;
  }
};

export const publishToWebhook = async (
  content: CampaignContent,
  imageUrl: string | null
) => {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        linkedin: content.linkedin,
        twitter: content.twitter,
        blog: content.blog,
        imageUrl: imageUrl
      })
    });
    
    if (!response.ok) {
      throw new Error("Failed to send to webhook");
    }
    return true;
  } catch (error) {
    console.error("Webhook Error:", error);
    throw error;
  }
};
