import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessagesBox = () => {
  const { currentChannelId, messages } = useSelector((state) => state.chats);
  const messagesBoxEl = useRef(null);
  useEffect(() => {
    messagesBoxEl.current.scrollIntoView();
  });
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages
        .filter(({ channelId }) => channelId === currentChannelId)
        .map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
      <div ref={messagesBoxEl} />
    </div>
  );
};

export default MessagesBox;
