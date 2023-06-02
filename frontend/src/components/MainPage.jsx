import { useDispatch } from 'react-redux';
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import { initChat } from '../slicers/chat.js';
import Channels from './Channels.jsx';
import MessageForm from './messages/MessageForm.jsx';
import MessagesBox from './messages/MessagesBox.jsx';
import MessagesHeader from './messages/MessagesHeader.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';
import AuthContext from '../contexts/AuthContext.jsx';
import NewChannelModal from './modals/NewChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';
import SpinnerComponent from './Spinner.jsx';

const MainPage = () => {
  const [loadingProcess, setLoadingProcess] = useState(null);
  const { getAuthHeader } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [isNewChannelModalOpened, setNewChannelModal] = useState(false);
  const [isRemoveChannelModalOpened, setRemoveChannelModal] = useState(false);
  const [isRenameChannelModalOpened, setRenameChannelModal] = useState(false);
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
