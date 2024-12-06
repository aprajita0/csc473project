import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { InboxStackIcon} from '@heroicons/react/24/solid';
import ComposeMessage from '../components/ComposeMessage';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filter, setFilter] = useState('Inbox');
  const [isComposeSelected, setIsComposeSelected] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const navigate = useNavigate();

  const handleComposeSelected = () => setIsComposeSelected(true);
  const handleComposeNotSelected = () => setIsComposeSelected(false);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }

      const response = await fetch('/api/users/get-messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
      setFilteredMessages(data);
    } catch (err) {
      console.error('Fetch Messages Error:', err.message);
    }
  };

  const filterMessages = (type) => {
    setFilter(type);
    if (type === 'Inbox') {
      setFilteredMessages(messages);
    } else if (type === 'Read') {
      setFilteredMessages(messages.filter((msg) => msg.is_read));
    } else if (type === 'Unread') {
      setFilteredMessages(messages.filter((msg) => !msg.is_read));
    }
  };

  const handleMarkRead = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('/api/users/mark-as-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message_id: messageId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, is_read: true } : msg
        )
      );
      setFilteredMessages((prevFilteredMessages) =>
        prevFilteredMessages.map((msg) =>
          msg._id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (error) {
      console.error('Error marking message as read:', error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex flex-col p-4 mt-28">
        <div className="flex-grow flex">
          <aside className="w-1/4 bg-gray-200 p-4">
            <ul className="space-y-4">
              <li className={`cursor-pointer hover:font-bold text-gray-600 ${filter === 'Inbox' ? 'font-bold text-[#41403e]' : ''}`}onClick={() => filterMessages('Inbox')}>
                Inbox
              </li>
              <li className={`cursor-pointer hover:font-bold text-gray-600 ${filter === 'Unread' ? 'font-bold text-[#41403e]' : ''}`}onClick={() => filterMessages('Unread')}>
                Unread
              </li>
              <li className={`cursor-pointer hover:font-bold text-gray-600 ${ filter === 'Read' ? 'font-bold text-[#41403e]' : ''}`} onClick={() => filterMessages('Read')}>
                Read
              </li>
            </ul>
          </aside>
          <div className="w-3/4 p-4">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold">{filter}</h2>
                  <InboxStackIcon className="h-5 w-5 font-bold text-[#41403e]" />
                </div>
                <div className="flex items-center space-x-2">
                  <PencilSquareIcon className="h-5 w-5 font-bold text-[#41403e]" />
                  <button className="font-bold text-[#41403e] hover:underline" onClick={handleComposeSelected}>
                    Compose
                  </button>
                </div>
              </div>
              <ul className="divide-y divide-gray-200 mt-4">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <li key={message._id} className="p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer" 
                    onClick={() => {
                      if (!message.is_read) handleMarkRead(message._id); 
                      setSelectedMessage(message); 
                    }}>
                    <div className="flex flex-col flex-grow overflow-hidden">
                      <p className="font-medium">{message.from_message?.username || 'Unknown User'}</p>
                      <p className="text-sm text-gray-500 truncate"style={{ maxWidth: '100%' }}> {message.message}</p>
                    </div>
                    <div className="flex-shrink-0 pl-4">
                      <p className={`text-sm ${ message.is_read ? 'text-gray-500' : 'font-bold text-[#41403e]'}`}>{message.is_read ? 'Read' : 'Unread'}</p>
                    </div>
                  </li>
                ))
              ) : (
              <p className="text-gray-500">No messages to display</p>
              )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ComposeMessage isOpen={isComposeSelected} onClose={handleComposeNotSelected} />
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Message Details</h2>
            <p className="text-sm text-gray-600 mb-4">
              <strong className="text-md font-bold text-gray-800">From:</strong> {selectedMessage.from_message?.username || 'Unknown User'}
            </p>
            <p className="text-md text-gray-700">{selectedMessage.message}</p>
            <button onClick={() => setSelectedMessage(null)} className="mt-4 text-gray-700 font-bold text-sm border-2 border-gray-700 rounded-full px-6 py-2 hover:scale-105 ease-in-out duration-300 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Messages;
