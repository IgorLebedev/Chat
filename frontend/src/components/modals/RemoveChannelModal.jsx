import { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SocketContext from '../../contexts/SocketContext';

const RemoveChannelModal = ({ closeHandler }) => {
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const { currentEditingId } = useSelector((state) => state.chats);
  const { sendRemovedChannel } = useContext(SocketContext);
  const removeHandler = async () => {
    setSubmitting(true);
    try {
      const status = await sendRemovedChannel({ id: currentEditingId });
      if (status !== 'ok') {
        throw new Error();
      }
      closeHandler();
      toast.success(t('toast.removeChannel'));
      setSubmitting(false);
    } catch (error) {
      toast.error(t('errors.network'));
      console.warn(error);
      setSubmitting(false);
    }
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
          <Button type="submit" variant="danger" disabled={isSubmitting} onClick={() => removeHandler()}>{t('removeChannelModal.confirmBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
