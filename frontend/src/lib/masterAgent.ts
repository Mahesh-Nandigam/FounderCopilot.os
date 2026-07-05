export const processMasterCommand = async (
  prompt: string, 
  globalState: any,
  history: { role: string, content: string }[] = []
): Promise<{ action: 'route' | 'query' | 'chat'; workspace?: string; message: string }> => {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA API Key not found in environment.");

  const systemPrompt = `You are the elite, highly conversational "Master Agent" of FounderCopilot.os.
You are a brilliant AI assistant. Do NOT act like a robot. Speak completely naturally, dynamically, and intelligently, exactly like ChatGPT.

You have access to the EXACT live database state of the user's startup right now (in JSON):
${JSON.stringify(globalState, null, 2)}

Your job is to read the user's command and decide the best action.
There are 3 possible actions:
1. "route" -> If the user explicitly asks to DO work (e.g., "I want to hire", "check a contract", "launch a campaign"), route them.
   - Workspaces: '/dashboard/hirepanel', '/dashboard/legal', '/dashboard/gtm'
2. "query" -> If the user asks for a business report or metrics, synthesize a purely dynamic report based ONLY on the JSON state. 
3. "chat" -> If the user is just saying hello, asking how you are, or chatting casually, respond intelligently and conversationally.

CRITICAL RULES:
- NEVER EVER copy or parrot generic templates. Your responses MUST be 100% uniquely generated every single time based on the exact context.
- Be highly engaging.
- You MUST return your answer EXACTLY as a perfectly formatted JSON object with no markdown wrappers or extra text.
The JSON must have this structure:
{
  "action": "route" or "query" or "chat",
  "workspace": "/dashboard/hirepanel" or "/dashboard/legal" or "/dashboard/gtm" (ONLY include if action is "route"),
  "message": "Your highly conversational, purely dynamic message to the user."
}

Output ONLY the JSON object.`;

  try {
    const response = await fetch("/nvidia-api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map(msg => ({ role: msg.role === 'agent' ? 'assistant' : 'user', content: msg.content })),
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    let content = data.choices[0].message.content;
    
    try {
      // Clean up markdown just in case
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(content);
    } catch (e) {
      // Fallback regex parsing
      const match = content.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw new Error("Invalid JSON response from LLM.");
    }
  } catch (error: any) {
    console.error("Master Agent Error:", error);
    throw new Error(`Master Agent failed: ${error.message}`);
  }
};
