import { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../api/api';
import { sendMessageToAPI } from '../api/api';
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
    const response = await sendMessageToAPI(input);
    setLoading(false);
    setMessages((prev) => [...prev, { role: 'agent', content: response }]);
  }

  return (
    <div className="flex flex-col min-h-screen items-center bg-white border">
      <div
        className="flex-1 w-full max-w-[37.5rem] flex flex-col"
        style={{
          paddingTop: '11vh',
          paddingBottom: '2vh',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ width: '100%' }}
          >
            {msg.role === 'user' ? (
              <div
                className="px-4 py-2 rounded-2xl shadow-md text-sm sm:text-base bg-gray-120 text-black"
                style={{
                  maxWidth: '80%',
                  minWidth: '120px',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
              </div>
            ) : (
              <div
                className="text-sm sm:text-base leading-relaxed text-black"
                style={{
                  maxWidth: '80%',
                  padding: '16px 20px',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="mb-4 flex justify-start" style={{ width: '100%' }}>
            <div
              className="px-4 py-2 rounded-2xl shadow-md text-sm bg-gray-300 text-black"
              style={{ maxWidth: '80%', padding: '16px 20px' }}
            >
              Agent is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="mb-4 w-full max-w-[37.5rem] px-0">
        <div className="relative">
          <input
            className="w-full h-[5rem] border-gray-200 rounded-md shadow-lg border pr-12 py-2 px-3 text-base sm:text-lg"
            value={input}
            placeholder="Ask About Weather"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitHandler();
            }}
          />
          <div className="absolute right-2" style={{ top: '47px' }}>
            <Upload onClick={submitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}
