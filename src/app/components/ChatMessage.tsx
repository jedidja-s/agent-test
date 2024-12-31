import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, isUser }, ref) => {
    return (
      <div ref={ref} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } rounded-lg px-4 py-2 max-w-[70%]`}
        >
          {message}
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage; 