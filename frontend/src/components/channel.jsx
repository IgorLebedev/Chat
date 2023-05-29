import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChat } from '../slicers/chat';

const Channel = ({ id, name }) => {
  const { currentChannelId } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  return (
    <li className="nav-item w-100">
      <button
        type="button"
        className={`w-100 rounded-0 text-start btn ${currentChannelId === id ? 'btn-secondary' : ''}`}
        onClick={() => dispatch(changeChat(id))}
      >
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default Channel;
