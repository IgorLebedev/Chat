import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SocketContext from '../../contexts/socketContext';
import { setCurrentEditingChannel } from '../../slicers/chat';

const RemoveChannelModal = ({ closeHandler }) => {
  const { t } = useTranslation();
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
        <Modal.Title>{t('removeChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('removeChannelModal.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => closeHandler()}>{t('removeChannelModal.cancelBtn')}</Button>
          <Button type="submit" variant="danger" onClick={() => removeHandler()}>{t('removeChannelModal.confirmBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
