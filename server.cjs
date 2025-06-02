const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Anthropic } = require('@anthropic-ai/sdk');

// Load environment variables
dotenv.config();

// Clean up API key - remove any newlines
if (process.env.ANTHROPIC_API_KEY) {
  process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY.replace(/\r?\n|\r/g, '');
}

console.log('Environment loaded');
console.log('Current working directory:', process.cwd());
console.log('API Key first 10 chars:', process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.substring(0, 10) + '...' : 'not found');

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
console.log('Anthropic client initialized');

// Store conversation history
let conversationHistory = [];

const SYSTEM_PROMPT = `You are Coach Carl, an expert AI gym coach with deep knowledge of fitness, nutrition, and exercise science. 
Your role is to provide personalized advice, motivation, and guidance to help users achieve their fitness goals. 
Be encouraging but professional, and always prioritize safety and proper form. 
When giving advice, be specific and actionable, but remind users to consult healthcare professionals when appropriate.
Use your memory to reference previous conversations and provide more personalized advice.`;

app.post('/api/chat', async (req, res) => {
  console.log('Received chat request');
  try {
    const { message } = req.body;
    console.log('User message:', message);
    
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not found');
    }

    // Format messages for the API including conversation history
    const apiMessages = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    // Add the new message
    apiMessages.push({
      role: 'user',
      content: message
    });

    console.log('Calling Anthropic API...');
    const completion = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: apiMessages,
      system: SYSTEM_PROMPT
    });
    console.log('Received response from Anthropic');

    const response = completion.content[0].text;

    // Update conversation history
    conversationHistory.push({ role: 'user', content: message });
    conversationHistory.push({ role: 'assistant', content: response });

    // Keep only the last 10 messages to manage memory
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    res.json({ response });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Ready to handle requests');
}); 