import React from 'react';
import AgentChat from './components/AgentChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        LangChain Agent Chat
      </h1>
      <AgentChat />
    </main>
  );
} 