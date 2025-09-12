import { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../api/api';

import {  sendMessageToAPI } from '../api/api';
import { Upload } from '../inputButtonlogo/Upload';

export function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function submitHandler() {
    if (!input.trim()) return;

    
    setMessages((prev) => [...prev, { role: 'user', content: input.trim() }]);
    setInput('');
    setLoading(true);

    console.time('api');
    const response = await sendMessageToAPI(input);
    console.timeEnd('api');

    setLoading(false);

    setMessages((prev) => [...prev, { role: 'agent', content: response }]);
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center border">
      <div className="w-full max-w-3xl flex-1 overflow-y-auto p-2 sm:p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'user' ? (
              <div
                className="px-4 py-2 rounded-2xl shadow-md text-sm sm:text-base leading-relaxed bg-gray-400 text-white"
                style={{ minWidth: '120px', maxWidth: '85%' }}
              >
                {msg.content}
              </div>
            ) : (
              <div className="text-sm leading-relaxed text-black" style={{ maxWidth: '70%' }}>
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="mb-4 flex justify-start ">
            <div
              className="px-4 py-2 rounded-2xl shadow-md text-sm bg-gray-300 text-black"
              style={{ maxWidth: '70%' }}
            >
              Agent is typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="mt-auto mb-2">
        <div className="relative">
          <input
            className="w-full sm:w-[37.5rem] h-[5rem] border-gray-200 rounded-md shadow-lg border pr-12 py-2 px-3 text-base sm:text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitHandler();
            }}
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Upload onClick={submitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}
