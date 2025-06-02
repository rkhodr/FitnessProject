import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const icon = message.sender === 'user' ? '👤' : '🤖';
  const bubbleClass = message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai';
  const alignmentClass = message.sender === 'user' ? 'ml-auto' : 'mr-auto';

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`chat-bubble ${bubbleClass} ${alignmentClass} flex items-start space-x-2 max-w-[80%]`}>
        <span className="text-xl leading-none mt-1">{icon}</span>
        <div className="flex-1">
          <p className="text-[15px] leading-relaxed">{message.text}</p>
          {message.timestamp && (
            <span className="text-xs opacity-75 block mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 