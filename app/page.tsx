'use client';

import { useSearchParams } from 'next/navigation';
import { useChat } from 'ai/react';

export default function Chat() {
  const searchParams = useSearchParams();
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    body: {
      pass: searchParams.get('pass')
    }
  });
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {isLoading && <button onClick={stop}>stop</button>}
      {messages.length > 0
        ? messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
