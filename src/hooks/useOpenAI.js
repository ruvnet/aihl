import { useState, useEffect } from 'react';
import OpenAI from 'openai';

export const useOpenAI = () => {
  const [openai, setOpenai] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('llmSettings') || '{}');
    const apiKey = storedSettings.apiKey;

    if (!apiKey) {
      setError('OpenAI API key is missing. Please set it in the LLM settings.');
      return;
    }

    try {
      const openaiInstance = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: This is for demo purposes. In production, use server-side calls.
      });
      setOpenai(openaiInstance);
    } catch (err) {
      setError('Failed to initialize OpenAI client: ' + err.message);
    }
  }, []);

  const sendMessage = async (message, context) => {
    if (error) return error;
    if (!openai) return 'OpenAI is not initialized';

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for the AI Hacking League admin panel. Use the following context to answer questions: " + context },
          { role: "user", content: message }
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      return 'An error occurred while processing your request.';
    }
  };

  return { sendMessage, error };
};