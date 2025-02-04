'use client'
import React, { useState } from 'react';

const questions = [
  { question: "What is your name?", key: "name" },
  { question: "What is your grade level?", key: "grade" },
  { question: "What topics in math are you interested in?", key: "mathTopics" },
  { question: "What topics in science are you interested in?", key: "scienceTopics" },
];

const Page = () => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, key) => {
    setResponses({
      ...responses,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would embed the responses in a vector database
    console.log("User responses:", responses);
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Personalize Your AI Tutor</h1>
      {submitted ? (
        <div className="text-green-500">Thank you for your responses! Your AI tutor is now personalized.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-2 font-semibold">{q.question}</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e, q.key)}
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;