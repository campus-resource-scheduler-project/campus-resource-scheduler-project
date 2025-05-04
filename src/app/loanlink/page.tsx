/* eslint-disable max-len */

'use client';

import { useChat } from 'ai/react';
import { Container } from 'react-bootstrap';

export default function LoanLink() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/loanlink',
    initialMessages: [
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Hello! Ask me about resources that you might want to borrow!',
      },
    ],
  });

  return (

    <Container id="hasBG" style={{ display: 'flex', height: '100vh', overflow: 'hidden', justifySelf: 'center', alignSelf: 'center', backgroundSize: 'cover', minWidth: '100%', minHeight: '100vh' }}>
      <div className="p-4 mx-auto my-auto" style={{ width: '80%', height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#095A3E' }}>
        <div className="flex flex-col" style={{ height: '90%', overflowY: 'auto', backgroundColor: '#363636', padding: '20px' }}>
          {messages.length > 0
            ? messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
                style={{ color: 'white', fontSize: '1.2rem', fontWeight: '550' }}
              >
                {`${message.role}: ${message.content}`}
              </div>
            ))
            : null }
        </div>
        <form onSubmit={handleSubmit} className="">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="fixed bottom-0 w-100 p-2 border"
          />
        </form>
      </div>
    </Container>
  );
}
