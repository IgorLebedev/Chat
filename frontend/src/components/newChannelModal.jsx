import React, { useEffect, useRef, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import SocketContext from '../contexts/socketContext';

const NewChannelModal = ({ closeHandler }) => {
  const inputEl = useRef(null);
  const { sendChannel } = useContext(SocketContext);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      sendChannel({ name });
      closeHandler();
    },
  });

  return (
    <Modal show onHide={closeHandler} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
              isInvalid={formik.touched.name && formik.values.name === ''}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback className="invalid-feedback">Обязательное поле</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={closeHandler}>Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
