import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type ChatMessage = {
  role: 'user' | 'agent';
  content: string;
};

export async function sendMessageToAPI(input: string): Promise<string> {
  if (!input.trim()) return '';

  try {
    const res = await axios.post(
      `${API_URL}/agents/weatherAgent/stream`,
      {
        messages: [{ role: 'user', content: input.trim() }],
        runId: 'weatherAgent',
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId: `121A7051`,
        resourceId: 'weatherAgent',
      },
      {
        headers: {
          'x-mastra-dev-playground': 'true',
          'Content-Type': 'application/json',
        },
        responseType: 'text',
      }
    );

    const answer = res.data
      .split('\n')
      .filter((line: string) => line.trim().startsWith('0:'))
      .map((line: string) => {
        const match = line.match(/^0:"(.*)"$/);
        return match ? match[1] : '';
      })
      .join('');

    return answer || 'Out of my scope';
  } catch (error) {
    console.error('API error:', error);
    return 'Error occurred while fetching response.';
  }
}
