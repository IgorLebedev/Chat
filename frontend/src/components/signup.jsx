import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import {
  Container, Row, Col, Form, Card, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import routes from '../routes/routes';
import AuthContext from '../contexts/authContext';

const signUpSchema = Yup.object({
  username: Yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

const SignUp = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signUpProcess, setProcess] = useState(null);
  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async ({ username, password }) => {
      setProcess('signingUp');
      try {
        const { data: { token } } = await axios.post(routes.signup(), { username, password });
        logIn({ username, token });
        setProcess('success');
        navigate('/');
      } catch (error) {
        setProcess('error');
        if (error.response.status === 409) {
          setProcess('uniqueError');
        } else {
          console.warn(error);
        }
      }
    },
  });
  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
  return (
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-4">
          <Card className="shadow-sm">
            <Card className="flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form className="w-75" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="username"
                    className="form-control"
                    id="username"
                    ref={usernameInput}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.username && formik.errors.username)
                    || signUpProcess === 'uniqueError'}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="username"
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  {signUpProcess !== 'uniqueError' && (
                  <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    className="form-control"
                    id="password"
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.password && formik.errors.password)
                    || signUpProcess === 'uniqueError'}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="password"
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  {signUpProcess !== 'uniqueError' && (
                  <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                      {formik.errors.password}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.passwordConfirm && formik.errors.passwordConfirm)
                    || signUpProcess === 'uniqueError'}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    placeholder="passwordConfirm"
                  />
                  <Form.Label htmlFor="passwordConfirm">Пароль</Form.Label>
                  <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                    {signUpProcess === 'uniqueError' ? 'Такой пользователь уже существует' : formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-dark w-100" disabled={signUpProcess === 'signingUp'}>Зарегистрироваться</Button>
              </Form>
            </Card>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
