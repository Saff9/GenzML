import 'dotenv/config';

const config = {
  port: process.env.PORT,
  clientOriginUrl: process.env.CLIENT_ORIGIN_URL,
  grok: {
  apiKey: process.env.GROK_API_KEY,
},

  openai: {
    apiKey: process.env.OPENAI_API_KEY
  },
  perplexity: {
    apiKey: process.env.PERPLEXITY_API_KEY
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY
  },
  elevenlabs: {
    apiKey: process.env.ELEVENLABS_API_KEY
  },
  // Add your Vector DB config here
  // pinecone: { ... }
};

export default config;
