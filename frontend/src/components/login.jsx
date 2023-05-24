import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import routes from '../routes/routes.js'

const Login = () => {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, [])
  const [loginProcess, setProcess] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setProcess('logging')
      try {
        const data = await axios.post(routes.login(), values);
        console.log(data)
        setProcess('success')
      } catch (error) {
        console.log(error);
        setProcess('error');
      }
    }
  });
  return (
    <div className="container-fluid">
      <Form onSubmit={formik.handleSubmit}>
        <h1>Войти</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="username"
            className="form-control"
            id="username"
            ref={inputEl}
            required
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={loginProcess === 'error'}
            placeholder="username"
          />
          <Form.Label htmlFor="floatingInput">Ваш ник</Form.Label>
          
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            type="password"
            className="form-control"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={loginProcess === 'error'}
            placeholder="password"
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback className="invalid-tooltip " type="invalid">
            Неправильный пароль или имя
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100 btn btn-dark" disabled={loginProcess === 'logging'}>
          Войти
        </Button>
      </Form>
    </div>
  )
};

export default Login;