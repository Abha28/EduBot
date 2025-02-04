'use client';

import { useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state for better UX

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      setLoading(true);  // Set loading to true when submitting
      const formattedMessages = messages.map((message) => {
        if (message.role === 'user') {
          return `<|user|> ${message.content} <eos_token>`;
        } else if (message.role === 'assistant') {
          return `<|assistant|> ${message.content} <eos_token>`;
        } else if (message.role === 'system') {
          return `<|system|> ${message.content} <eos_token>`;
        }
        return '';
      }).join('\n');

      const finalPrompt = `${formattedMessages}\n<|user|> ${input} <eos_token>`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input, // Pass the user input directly to the backend
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.result || "No response from server" };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error fetching assistant response:', error);
    }

    setLoading(false);  // Set loading to false after the request is complete
    setInput('');  // Clear the input field
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-6">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong className="block mb-1 text-gray-700">{message.role === 'user' ? 'User:' : 'AI:'}</strong>
            <p className="text-gray-800">{message.content}</p>
          </div>
        ))}
      </div>
  
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
