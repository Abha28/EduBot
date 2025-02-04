//api/chat/route.js

import fetch from 'node-fetch';

export const maxDuration = 30;

export async function POST(req) {
  const { input, messages } = await req.json();

  // Log the prompt to check how it's being sent
  console.log("Received input:", input);

  try {
    // Format the prompt as required
    const formattedPrompt = `
<|system|>
You are a helpful AI tutor.
<|user|>
${input}
<|assistant|>
`;

    // Send the formatted prompt to the Llama server
    const response = await fetch("http://localhost:8080/completion", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: formattedPrompt,
        temperature: 0.7,  // Optional: you can adjust this value
      }),
    });

    const data = await response.json();

    // Check if the server returned the result
    if (data && data.content) {
      return new Response(JSON.stringify({ result: data.content }), { status: 200 });
    } else {
      console.error("Error: No valid response from Llama server.");
      return new Response(JSON.stringify({ error: 'No response from server' }), { status: 500 });
    }

  } catch (error) {
    console.error('Error contacting Llama server:', error);
    return new Response(JSON.stringify({ error: 'Unable to fetch response from Llama server' }), { status: 500 });
  }
}
