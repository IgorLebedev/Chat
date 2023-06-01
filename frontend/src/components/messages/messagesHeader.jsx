import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesHeader = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId, messages } = useSelector((state) => state.chats);
  const count = messages.filter(({ channelId }) => currentChannelId === channelId).length;
  const { name } = channels.find(({ id }) => currentChannelId === id);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${name}`}</b>
      </p>
      <span className="text-muted">{t('messages.amount.message', { count })}</span>
    </div>
  );
};

export default MessagesHeader;
