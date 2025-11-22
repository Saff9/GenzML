import axios from 'axios';
import config from '../config/index.js';

// Tries Perplexity first → falls back to Grok if Perplexity fails
export const getBestTextResponse = async (message, history = []) => {

  // --- Strategy 1: Try Perplexity ---
  try {
    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "llama-3-sonar-large-32k-online",
        messages: [
          ...history,
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${config.perplexity.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      source: "Perplexity",
      text: response.data.choices[0].message.content,
    };

  } catch (err) {
    console.warn("Perplexity API failed, falling back to Grok...", err.message);
  }

  // --- Strategy 2: Fallback to Grok ---
  try {
    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        model: "mixtral-8x7b-32768
",
        messages: [
          ...history,
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${config.grok.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      source: "Grok",
      text: response.data.choices[0].message.content,
    };

  } catch (err2) {
    console.error("Grok API also failed:", err2.message);
    throw new Error("All AI providers failed.");
  }
};
