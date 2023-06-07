import React from 'react';
import NewChannelModal from './NewChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const getModal = (modal) => {
  switch (modal) {
    case 'newChannel': {
      return <NewChannelModal />;
    }
    case 'rename': {
      return <RenameChannelModal />;
    }
    case 'remove': {
      return <RemoveChannelModal />;
    }
    default: throw new Error(`Unknown modal ${modal}`);
  }
};

export default getModal;
