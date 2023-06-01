import React, { useEffect, useRef, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import SocketContext from '../../contexts/socketContext';
import { setCurrentEditingChannel } from '../../slicers/chat';

const RenameChannelModal = ({ closeHandler }) => {
  const { t } = useTranslation();
  const { currentEditingId } = useSelector((state) => state.chats);
  const { channels } = useSelector((state) => state.chats);
  const desiredChannel = channels.find(({ id }) => id === currentEditingId);
  const dispatch = useDispatch();
  const channelsNames = channels.map(({ name }) => name);
  const inputEl = useRef(null);
  const { sendRenamedChannel } = useContext(SocketContext);
  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: desiredChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, t('renameChannelModal.validation.minmax'))
        .max(20, t('renameChannelModal.validation.minmax'))
        .required(t('renameChannelModal.validation.required'))
        .notOneOf(channelsNames, t('renameChannelModal.validation.uniqueError')),
    }),
    onSubmit: ({ name }) => {
      sendRenamedChannel({ name, id: currentEditingId, removable: true });
      closeHandler();
      dispatch(setCurrentEditingChannel(null));
    },
  });

  return (
    <Modal show onHide={closeHandler} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              id="name"
              ref={inputEl}
              className="mb-2"
              placeholder=""
              isInvalid={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Label htmlFor="name" className="visually-hidden">{t('renameChannelModal.name')}</Form.Label>
            <Form.Control.Feedback className="invalid-feedback">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={closeHandler}>{t('renameChannelModal.cancelBtn')}</Button>
              <Button type="submit" variant="primary">{t('renameChannelModal.confirmBtn')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
