import React from 'react';
import NewChannelModal from './NewChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const getModal = (modal, closeHandler) => {
  switch (modal) {
    case 'newChannel': {
      return <NewChannelModal closeHandler={closeHandler} />;
    }
    case 'rename': {
      return <RenameChannelModal closeHandler={closeHandler} />;
    }
    case 'remove': {
      return <RemoveChannelModal closeHandler={closeHandler} />;
    }
    default: throw new Error(`Unknown modal ${modal}`);
  }
};

export default getModal;
