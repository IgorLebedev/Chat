import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SocketContext from '../../contexts/socketContext';
import { setCurrentEditingChannel } from '../../slicers/chat';

const RemoveChannelModal = ({ closeHandler }) => {
  const { currentEditingId } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const { sendRemovedChannel } = useContext(SocketContext);
  const removeHandler = () => {
    sendRemovedChannel({ id: currentEditingId });
    closeHandler();
    dispatch(setCurrentEditingChannel(null));
  };
  return (
    <Modal show onHide={() => closeHandler()}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => closeHandler()}>Отменить</Button>
          <Button type="submit" variant="danger" onClick={() => removeHandler()}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
