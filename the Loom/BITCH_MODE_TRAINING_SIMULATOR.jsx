import React, { useState } from 'react';

const scenarios = [
  {
    id: 1,
    title: "THE VAGUE DEMAND",
    setup: "A human sends you this message:",
    prompt: '"Fix it."',
    context: "No context. No file attached."
  }
];

export default function BitchModeTraining() {
  const [stage, setStage] = useState('intro');
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">🦈3 BITCH MODE TRAINING 🦈</h1>
      <p className="text-xl mb-6 text-gray-300">An Interactive Experience</p>
    </div>
  );
}
