import { useDispatch } from 'react-redux';
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import { initChat } from '../slicers/chat.js';
import Channels from './channels.jsx';
import MessageForm from './messages/messageForm.jsx';
import MessagesBox from './messages/messagesBox.jsx';
import MessagesHeader from './messages/messagesHeader.jsx';
import ChannelsHeader from './channelsHeader.jsx';
import AuthContext from '../contexts/authContext.jsx';
import NewChannelModal from './modals/newChannelModal.jsx';
import RemoveChannelModal from './modals/removeChannelModal.jsx';
import RenameChannelModal from './modals/renameChannelModal.jsx';
import SpinnerComponent from './spinner.jsx';

const MainPage = () => {
  const [loadingProcess, setLoadingProcess] = useState(null);
  const [isNewChannelModalOpened, setNewChannelModal] = useState(false);
  const [isRemoveChannelModalOpened, setRemoveChannelModal] = useState(false);
  const [isRenameChannelModalOpened, setRenameChannelModal] = useState(false);
  const dispatch = useDispatch();
  const { getAuthHeader } = useContext(AuthContext);
  const modalHandlers = {
    openNewChannel: () => {
      setNewChannelModal(true);
    },
    openRemoveChannel: () => {
      setRemoveChannelModal(true);
    },
    openRenameChannel: () => {
      setRenameChannelModal(true);
    },
    closeNewChannel: () => {
      setNewChannelModal(false);
    },
    closeRemoveChannel: () => {
      setRemoveChannelModal(false);
    },
    closeRenameChannel: () => {
      setRenameChannelModal(false);
    },
  };

  useEffect(() => {
    setLoadingProcess('loading');
    const getData = async () => {
      try {
        const res = await axios.get(routes.data(), getAuthHeader());
        dispatch(initChat(res.data));
        setLoadingProcess('loaded');
      } catch (err) {
        setLoadingProcess('error');
      }
    };
    getData();
  }, [dispatch, getAuthHeader]);

  return (
    <>
      {loadingProcess === 'loading' && <SpinnerComponent />}
      {loadingProcess === 'loaded' && (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsHeader openNewChannelModal={modalHandlers.openNewChannel} />
            <Channels
              openRenameModal={modalHandlers.openRenameChannel}
              openRemoveModal={modalHandlers.openRemoveChannel}
            />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesHeader />
              <MessagesBox />
              <MessageForm />
            </div>
          </div>
        </div>
        {isNewChannelModalOpened && (
        <NewChannelModal closeHandler={modalHandlers.closeNewChannel} />)}
        {isRemoveChannelModalOpened && (
        <RemoveChannelModal closeHandler={modalHandlers.closeRemoveChannel} />)}
        {isRenameChannelModalOpened && (
        <RenameChannelModal closeHandler={modalHandlers.closeRenameChannel} />)}
      </div>
      )}
    </>
  );
};

export default MainPage;
