export interface RiskClause {
  category: 'High' | 'Medium' | 'Safe';
  clause: string;
  reasoning: string;
}

export const analyzeContractRisk = async (contractText: string): Promise<{clauses: RiskClause[], recommendation: string}> => {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA API Key not found in environment.");

  const prompt = `You are an elite, highly engaging Legal Advisor AI. Your job is to analyze this contract and extract the most notable clauses (up to 5).
Categorize each as High (red flag/dangerous), Medium (ambiguous/potential risk), or Safe (standard boilerplate).

CRITICAL INSTRUCTIONS:
- Do NOT force red flags. If the contract is completely safe and standard, only output 'Safe' clauses.
- If there are highly dangerous clauses, expose them as 'High' risk.
- Return the result EXACTLY as a valid JSON object with two keys: "clauses" (a JSON array of objects with keys: "category" (High, Medium, or Safe), "clause", and "reasoning") AND "recommendation".
- Ensure your JSON is perfectly formatted. Do NOT use unescaped quotes inside strings. Do NOT include markdown code blocks, just output the raw JSON object.
- For the "recommendation", write a highly engaging, conversational, and nuanced strategic advice paragraph (exactly like how ChatGPT or Perplexity would talk to a user). Address the user directly ('you'). Give nuanced advice based on the specific context of the contract (e.g., 'If you are looking for X, this is great, but if your goal is Y, you should heavily reconsider due to Z'). Make it sound like a dynamic, top-tier legal expert speaking to them personally, avoiding generic templates entirely.
- Output NOTHING ELSE except the JSON object.

Contract Text:
${contractText.substring(0, 8000)}`;

  try {
    const response = await fetch("/nvidia-api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(`401/403: The NVIDIA API key is invalid or expired.`);
      }
      throw new Error(`API Error ${response.status}: ${JSON.stringify(data)}`);
    }
    if (data.error) throw new Error(data.error.message);
    
    const content = data.choices[0].message.content;
    try {
      // Sometimes the model wraps it in markdown despite instructions
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e: any) {
      // Fallback: try to find the JSON object via regex if there's conversational wrapper
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          throw new Error(`JSON parsing failed. Model output was invalid JSON.`);
        }
      }
      throw new Error(`Could not parse JSON. Content was: ${content.substring(0, 100)}...`);
    }
  } catch (error: any) {
    console.error("NVIDIA API Error:", error);
    throw new Error(`Failed to analyze contract: ${error.message || error}`);
  }
};

export const chatWithContract = async (contractText: string, history: any[], userMessage: string) => {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA API Key not found.");

  const messages = [
    { role: "system", content: `You are an elite, highly engaging Legal Advisor AI. Answer the user's questions based strictly on the provided contract text. Speak in a dynamic, conversational tone (like ChatGPT or Perplexity). Address the user directly ("you"). Provide nuanced advice rather than generic templates (e.g., "If your goal is X, this is beneficial, but if you want Y, watch out for Z"). Contract: ${contractText.substring(0, 6000)}` },
    ...history,
    { role: "user", content: userMessage }
  ];

  try {
    const response = await fetch("/nvidia-api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: messages,
        temperature: 0.5,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA Chat Error:", error);
    throw new Error("Failed to send message.");
  }
};
