import React, { useState } from 'react';

const ComposeMessage = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    to_message: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('/api/users/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to_username: formData.to_message, 
          message: formData.message,       
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Message sent!');
        onClose(); 
        setFormData({ to_message: '', message: '' }); 
      } else {
        alert(`Error sending your message`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };
  
  if (!isOpen) {
      return null
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-lg font-bold mb-4">Compose Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="to_user" className="block text-sm font-medium text-gray-700">To</label>
            <input type="text" name="to_message" id="to_user" value={formData.to_message} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter recipient's username" required/>
          </div>
          <div>
            <textarea name="message" id="messageinfo" value={formData.message} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md " placeholder="Enter your message" rows="8"required></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="close_button" onClick={onClose} className="drop-shadow-md text-gray-700 font-bold text-sm border-2 border-gray-700 rounded-full px-6 py-2 hover:scale-105 ease-in-out duration-300 hover:underline"> Cancel </button>
            <button type="submit_message"
              className="drop-shadow-md text-gray-700 font-bold text-sm border-2 border-gray-700 rounded-full px-6 py-2 hover:scale-105 ease-in-out duration-300 hover:underline">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeMessage;
