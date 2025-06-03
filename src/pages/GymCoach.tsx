import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import ChatMessage from '../components/ChatInterface/ChatMessage';
import ChatInput from '../components/ChatInterface/ChatInput';
import { useData } from '../context/DataContext';
import { ChatMessage as ChatMessageType } from '../types';

const GymCoach = () => {
  const { messages, addMessage } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeMessageSent, setWelcomeMessageSent] = useState(false);

  useEffect(() => {
    // Add initial welcome message if there are no messages and it hasn't been sent yet
    if (messages.length === 0 && !welcomeMessageSent) {
      addMessage({
        text: "👋 Hi! I'm Coach Carl. I can help you with workout plans, form checks, nutrition advice, and tracking your progress. What would you like to know?",
        sender: 'ai'
      });
      setWelcomeMessageSent(true);
    }
  }, [messages.length, addMessage, welcomeMessageSent]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    addMessage({ text, sender: 'user' });
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      addMessage({
        text: data.response,
        sender: 'ai'
      });
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        text: "I apologize, but I'm having trouble connecting to my brain right now. Please try again in a moment.",
        sender: 'ai'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title="Coach Carl"
        onSettingsClick={() => alert('Settings clicked')}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="chat-bubble chat-bubble-ai mr-auto flex items-center space-x-2">
            <span className="text-xl">🤖</span>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default GymCoach; 