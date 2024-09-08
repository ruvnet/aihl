import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';

export const useOpenAI = () => {
  const [openai, setOpenai] = useState(null);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('llmSettings') || '{}');
    const configuration = new Configuration({
      apiKey: storedSettings.apiKey,
    });
    setOpenai(new OpenAIApi(configuration));
  }, []);

  const sendMessage = async (message, context) => {
    if (!openai) return 'OpenAI is not initialized';

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for the AI Hacking League admin panel. Use the following context to answer questions: " + context },
          { role: "user", content: message }
        ],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      return 'An error occurred while processing your request.';
    }
  };

  return { sendMessage };
};