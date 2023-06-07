import { useDispatch, useSelector } from 'react-redux';
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { initChat } from '../slicers/chat.js';
import Channels from './Channels.jsx';
import MessageForm from './messages/MessageForm.jsx';
import MessagesBox from './messages/MessagesBox.jsx';
import MessagesHeader from './messages/MessagesHeader.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';
import AuthContext from '../contexts/AuthContext.jsx';
import getModal from './modals/index.jsx';
import SpinnerComponent from './Spinner.jsx';

const MainPage = () => {
  const [loadingProcess, setLoadingProcess] = useState(null);
  const { fetchData } = useContext(AuthContext);
  const { currentModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingProcess('loading');
    const getData = async () => {
      try {
        const data = await fetchData();
        dispatch(initChat(data));
        setLoadingProcess('loaded');
      } catch (err) {
        setLoadingProcess('error');
      }
    };
    getData();
  }, [dispatch, fetchData]);

  return (
    <>
      {loadingProcess === 'loading' && <SpinnerComponent />}
      {loadingProcess === 'loaded' && (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsHeader />
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesHeader />
              <MessagesBox />
              <MessageForm />
            </div>
          </div>
        </div>
        {currentModal && getModal(currentModal)}
      </div>
      )}
    </>
  );
};

export default MainPage;
