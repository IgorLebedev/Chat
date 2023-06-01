import React, { useRef, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/authContext';

const MessageForm = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.chats);
  const { sendMessage } = useContext(SocketContext);
  const { user: { username } } = useContext(AuthContext);
  const inputMessage = useRef(null);

  useEffect(() => {
    inputMessage.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      sendMessage({ body, username, channelId: currentChannelId });
      resetForm({ body: '' });
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group">
          <Form.Control
            type="text"
            id="body"
            ref={inputMessage}
            aria-label={t('messages.form.aria')}
            className="border-0 p-0 ps-2"
            placeholder={t('messages.form.placeholder')}
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <button type="submit" disabled={formik.values.body === ''} className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('messages.form.submit')}</span>
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
