import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`p-2 rounded-lg ${
            isLoading || !message.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          disabled={isLoading || !message.trim()}
        >
          <FiSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput; 