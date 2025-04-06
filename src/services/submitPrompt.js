import axios from "axios";

async function submitPrompt(apiKey, prompt) {
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Dada la siguiente idea de startup, clasificala como una idea millonaria o una estafa piramidal. Con humor, explica la razón de tu clasificación en una oración: ${prompt}` }],
        max_tokens: 60
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      })

    return res.data?.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error communicating with the openAI API:", error);
  }
}

export default submitPrompt;