import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import routes from '../routes/routes.js';
import { initChat } from '../slicers/chat.js';

const MainPage = () => {
  const [loadingProcess, setProcess] = useState(null);
  const { channels, currentChannelId, messages } = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    setProcess('loading');
    const getData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(routes.data(), { headers: { Authorization: `Bearer ${token}` } });
        dispatch(initChat(res.data));
        setProcess('loaded');
      } catch (err) {
        setProcess('error');
      }
    };
    getData();
  }, [dispatch]);

  const inputMessage = useRef(null);

  useEffect(() => {
    if (loadingProcess === 'loaded') {
      inputMessage.current.focus();
    }
  }, [loadingProcess]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              />
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {loadingProcess === 'loaded' && channels.map(({ id, name }) => (
              <li key={id} className="nav-item w-100">
                <button type="button" className="w-100 rounded-0 text-start btn">
                  <span className="me-1">#</span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            {loadingProcess === 'loaded' && (
            <>
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>{`# ${channels.find(({ id }) => currentChannelId === id).name}`}</b>
                </p>
                <span className="text-muted">{`${messages.length} сообщений`}</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5" />
              <div className="mt-auto px-5 py-3">
                <Form className="py-1 border rounded-2">
                  <Form.Group className="input-group">
                    {console.log(formik.errors)}
                    <Form.Control
                      type="text"
                      id="message"
                      ref={inputMessage}
                      className="border-0 p-0 ps-2"
                      placeholder="Введите сообщение..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    />
                    <Button type="submit" disabled={formik.values.message === ''} />
                  </Form.Group>
                </Form>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
