import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slicers/chat.js';
import SocketContext from '../contexts/socketContext.jsx';

const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const ws = useRef(null);
  useEffect(() => {
    const socket = io();
    socket.on('connect', () => setConnected(true));
    socket.on('newMessage', (message) => {
      console.log(message);
      dispatch(addMessage(message));
    });
    socket.on('disconnect', () => console.log('okok'));
    ws.current = socket;
    return () => {
      socket.disconnect();
      console.log(connected);
    };
  }, []);
  const sendMessage = (message) => {
    ws.current.emit('newMessage', message);
  };

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
