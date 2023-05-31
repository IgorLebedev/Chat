import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessage, addChannel, removeChannel, renameChannel, changeChat,
} from '../slicers/chat.js';
import SocketContext from '../contexts/socketContext.jsx';

const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const newChannelId = useRef(null);
  const ws = useRef(null);
  useEffect(() => {
    const socket = io();

    socket.on('connect', () => setConnected(true));
    socket.on('newMessage', (message) => dispatch(addMessage(message)));
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      if (newChannelId.current) {
        dispatch(changeChat(newChannelId.current));
      }
    });
    socket.on('removeChannel', (channel) => dispatch(removeChannel(channel)));
    socket.on('renameChannel', (channel) => dispatch(renameChannel(channel)));

    ws.current = socket;

    return () => {
      socket.disconnect();
      console.log(connected);
    };
  }, [connected, dispatch]);

  const sendMessage = (message) => {
    ws.current.emit('newMessage', message, (acknowledge) => acknowledge.status);
  };
  const sendChannel = (channel) => {
    ws.current.emit('newChannel', channel, ({ data }) => {
      newChannelId.current = data.id;
    });
  };
  const sendRemovedChannel = (channel) => {
    ws.current.emit('removeChannel', channel);
  };
  const sendRenamedChannel = (channel) => {
    ws.current.emit('renameChannel', channel);
  };

  return (
    <SocketContext.Provider
      value={{
        sendMessage, sendChannel, sendRemovedChannel, sendRenamedChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
