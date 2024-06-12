// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('http://localhost:5000');

const Chat = ({ user }) => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const joinRoom = async () => {
    if (room !== '') {
      socket.emit('join_room', room);
      const response = await axios.get(`http://localhost:5000/messages/${room}`);
      setMessages(response.data);
    }
  };

  const sendMessage = () => {
    const messageData = {
      room,
      username: user.username,
      message
    };
    socket.emit('send_message', messageData);
    setMessage('');
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Room ID" onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <h4>{msg.username}</h4>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
