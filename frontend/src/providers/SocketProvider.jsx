import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessage, addChannel, removeChannel, renameChannel, changeChat,
} from '../slicers/chat.js';
import SocketContext from '../contexts/SocketContext.jsx';

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
        newChannelId.current = null;
      }
    });
    socket.on('removeChannel', (channel) => dispatch(removeChannel(channel)));
    socket.on('renameChannel', (channel) => dispatch(renameChannel(channel)));

    ws.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [connected, dispatch]);

  const sendMessage = async (message) => {
    try {
      const res = await new Promise((resolve, reject) => {
        ws.current.emit('newMessage', message, (acknowledge) => resolve(acknowledge.status));
        setTimeout(reject, 5000);
      });
      return res;
    } catch (error) {
      throw new Error('network error');
    }
  };
  const sendChannel = async (channel) => {
    try {
      const res = await new Promise((resolve, reject) => {
        ws.current.emit('newChannel', channel, (acknowledge) => {
          newChannelId.current = acknowledge.data.id;
          resolve(acknowledge.status);
        });
        setTimeout(reject, 5000);
      });
      return res;
    } catch (error) {
      throw new Error('network error');
    }
  };
  const sendRemovedChannel = async (channel) => {
    try {
      const res = await new Promise((resolve, reject) => {
        ws.current.emit('removeChannel', channel, (acknowledge) => resolve(acknowledge.status));
        setTimeout(reject, 5000);
      });
      return res;
    } catch (error) {
      throw new Error('network error');
    }
  };
  const sendRenamedChannel = async (channel) => {
    try {
      const res = await new Promise((resolve, reject) => {
        ws.current.emit('renameChannel', channel, (acknowledge) => resolve(acknowledge.status));
        setTimeout(reject, 5000);
      });
      return res;
    } catch (error) {
      throw new Error('network error');
    }
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
