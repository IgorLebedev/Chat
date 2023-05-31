import { useDispatch, useSelector } from 'react-redux';
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import axios from 'axios';
import routes from '../routes/routes.js';
import { initChat } from '../slicers/chat.js';
import Channels from './channels.jsx';
import AuthContext from '../contexts/authContext.jsx';
import MessageForm from './messageForm.jsx';
import NewChannelModal from './modals/newChannelModal.jsx';
import RemoveChannelModal from './modals/removeChannelModal.jsx';
import RenameChannelModal from './modals/renameChannelModal.jsx';

const MainPage = () => {
  const [loadingProcess, setLoadingProcess] = useState(null);
  const [isNewChannelModalOpened, setNewChannelModal] = useState(false);
  const [isRemoveChannelModalOpened, setRemoveChannelModal] = useState(false);
  const [isRenameChannelModalOpened, setRenameChannelModal] = useState(false);
  const { channels, currentChannelId, messages } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const { getAuthHeader } = useContext(AuthContext);
  const modalHandlers = {
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
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setNewChannelModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels
            loadingProcess={loadingProcess}
            channels={channels}
            openRenameModal={modalHandlers.openRenameChannel}
            openRemoveModal={modalHandlers.openRemoveChannel}
          />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            {loadingProcess === 'loaded' && (
            <>
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>{`# ${channels.find(({ id }) => currentChannelId === id).name}`}</b>
                </p>
                <span className="text-muted">{`${messages.filter(({ channelId }) => currentChannelId === channelId).length} сообщений`}</span>
              </div>
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
              </div>
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </>
            )}
          </div>
        </div>
      </div>
      {isNewChannelModalOpened && <NewChannelModal closeHandler={modalHandlers.closeNewChannel} />}
      {isRemoveChannelModalOpened && (
      <RemoveChannelModal closeHandler={modalHandlers.closeRemoveChannel} />)}
      {isRenameChannelModalOpened && (
      <RenameChannelModal closeHandler={modalHandlers.closeRenameChannel} />)}
    </div>
  );
};

export default MainPage;
