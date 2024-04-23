import React, { useEffect, useRef } from 'react';

const MessageDisplay = ({ messages }) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const formatDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString();
    }
  };
  
  return (
    <div ref={messageContainerRef} className="overflow-y-auto max-h-[60vh] border border-gray-300 rounded-md p-2 mb-4 flex-grow">
      {messages.map((message, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded-lg mb-2 mr-8 overflow-hidden">
          <div className="text-xs text-gray-500 mb-1">{message.username}</div>
          <div style={{ minHeight: '2rem', clear: 'both' }}>
            <p className="text-gray-700 overflow-wrap break-word">{message.content}</p>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
