import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageDisplay from './MessageDisplay';  

const GroupDetails = ({ group, email }) => {
  const [messages, setMessages] = useState([]);
  const isAdmin = group.isAdmin;
  const messageDisplayRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/get-messages', {
          params: {
            groupId: group.id,
            email: email,
          }
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [group.id, email]);

  const handlePostMessage = async () => {
    try {
      const messageContent = document.getElementById('messageTextarea').value;
  
      const data = {
        content: messageContent,
        groupId: group.id,
        email: email,
      };
  
      const response = await axios.post('http://localhost:8000/app/post-message', data);
  
      console.log('Response from server:', response.data);
  
      if (response.data.success) {
        const { message_id, group_id, message_content, timestamp } = response.data;
        
        const newMessage = {
          message_id: message_id,
          group_id: group_id,
          content: message_content,
          timestamp: timestamp
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
  
        document.getElementById('messageTextarea').value = '';
  
        messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };
  

  return (
    <div className="w-3/5 p-4 border border-gray-300 rounded-lg mt-4 ml-4 mb-4 flex flex-col">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                <img src={group.image} alt="Group Image" className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-700 font-semibold text-lg ">{group.name}</span>
        </div>

      <p className="text-gray-700 mb-4">{group.description}</p>

      <MessageDisplay messages={messages} ref={messageDisplayRef} />

      <div className="mt-auto">
        <textarea
          id="messageTextarea"
          rows="4"
          className="w-full border border-gray-300 rounded-md p-2 mb-2 resize-none overflow-auto"
          placeholder="Write your message here..."
        ></textarea>
        <button onClick={handlePostMessage} className="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded">Post Message</button>
      </div>

    </div>
  );
};

export default GroupDetails;
