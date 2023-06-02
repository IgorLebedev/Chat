import React, { useEffect, useRef, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import SocketContext from '../../contexts/SocketContext';

const NewChannelModal = ({ closeHandler }) => {
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.chats);
  const channelsNames = channels.map(({ name }) => name);
  const inputEl = useRef(null);
  const { sendChannel } = useContext(SocketContext);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(3, t('newChannelModal.validation.minmax'))
        .max(20, t('newChannelModal.validation.minmax'))
        .required(t('newChannelModal.validation.required'))
        .notOneOf(channelsNames, t('newChannelModal.validation.uniqueError')),
    }),
    onSubmit: async ({ name }) => {
      try {
        const status = await sendChannel({ name });
        if (status !== 'ok') {
          throw new Error();
        }
        formik.resetForm();
        closeHandler();
        toast.success(t('toast.newChannel'));
      } catch (error) {
        toast.error(t('errors.network'));
        console.warn(error);
      }
    },
  });

  return (
    <Modal show onHide={closeHandler} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>{t('newChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              id="name"
              disabled={formik.isSubmitting}
              ref={inputEl}
              className="mb-2"
              placeholder=""
              isInvalid={formik.touched.name && formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Label htmlFor="name" className="visually-hidden">{t('newChannelModal.name')}</Form.Label>
            <Form.Control.Feedback className="invalid-feedback">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={closeHandler}>{t('newChannelModal.cancelBtn')}</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('newChannelModal.confirmBtn')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
