'use client';

import { useChat } from 'ai/react';
import { Container } from 'react-bootstrap';

export default function LoanLink() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/loanlink',
    initialMessages: [
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: 'Hello! Ask me about resources that you might need!',
      },
    ],
  });

  return (
    <Container id="hasBG" style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
      <div className="mx-auto max-w-md py-24 flex flex-col stretch items-center" style={{ width: '100vw' }}>
        <div className="max-w-2xl p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col space-y-4">
            {messages.length > 0
              ? messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-2 rounded-lg ${
                    message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              ))
              : null }
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="fixed bottom-0 w-full p-2 border border-gray-300 rounded-lg items-center"
            />
          </form>
        </div>
      </div>
    </Container>
  );
}
