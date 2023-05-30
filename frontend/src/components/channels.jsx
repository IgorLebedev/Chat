import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { changeChat, setCurrentEditingChannel } from '../slicers/chat';

const RemovableChannel = ({
  id, name, dispatch, currentChannelId, openRenameModal, openRemoveModal,
}) => {
  const removeModalHandler = () => {
    dispatch(setCurrentEditingChannel(id));
    openRemoveModal();
  };
  const renameModalHandler = () => {
    dispatch(setCurrentEditingChannel(id));
    openRenameModal();
  };
  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <button
          type="button"
          className={`w-100 rounded-0 text-start text-truncate btn ${currentChannelId === id ? 'btn-secondary' : 'outline-secondary'}`}
          onClick={() => dispatch(changeChat(id))}
        >
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown.Toggle
          split
          className="flex-grow-0"
          variant={currentChannelId === id ? 'secondary' : 'light'}
          id="dropdown-button-drop-down"
          drop="down"
        />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={() => removeModalHandler()}>Удалить</Dropdown.Item>
          <Dropdown.Item href="#/action-1" onClick={() => renameModalHandler()}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const StaticChannel = ({
  id, name, dispatch, currentChannelId,
}) => (
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

const Channels = ({
  loadingProcess, channels, openRenameModal, openRemoveModal,
}) => {
  const { currentChannelId } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {loadingProcess === 'loaded' && channels.map(({ id, name, removable }) => (
        <>
          {removable && (
          <RemovableChannel
            key={id}
            id={id}
            name={name}
            dispatch={dispatch}
            openRenameModal={openRenameModal}
            openRemoveModal={openRemoveModal}
            currentChannelId={currentChannelId}
          />
          )}
          {!removable && (
          <StaticChannel
            key={id}
            id={id}
            name={name}
            dispatch={dispatch}
            currentChannelId={currentChannelId}
          />
          )}
        </>
      ))}
    </ul>
  );
};

export default Channels;
