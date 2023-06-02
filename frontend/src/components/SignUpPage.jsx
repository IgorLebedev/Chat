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
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes/routes';
import AuthContext from '../contexts/AuthContext';

const SignUp = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [uniqueError, setError] = useState(false);
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
    validationSchema: Yup.object({
      username: Yup
        .string()
        .min(3, t('signup.validation.minmax'))
        .max(20, t('signup.validation.minmax'))
        .required(t('signup.validation.required')),
      password: Yup
        .string()
        .min(6, t('signup.validation.min'))
        .required(t('signup.validation.required')),
      passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password'), null], t('signup.validation.confirmation')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data: { token } } = await axios.post(routes.signup(), { username, password });
        logIn({ username, token });
        setError(false);
        navigate('/');
      } catch (error) {
        if (error.request.status === 409) {
          setError(true);
        } else {
          console.warn(error);
          toast.error(t('errors.network'));
        }
      }
    },
  });
  return (
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-4">
          <Card className="shadow-sm">
            <Card className="flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form className="w-75" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="username"
                    className="form-control"
                    id="username"
                    ref={usernameInput}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.username && formik.errors.username)
                    || uniqueError}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="username"
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  {!uniqueError && (
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
                    || uniqueError}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="password"
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  {!uniqueError && (
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
                    || uniqueError}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    placeholder="passwordConfirm"
                  />
                  <Form.Label htmlFor="passwordConfirm">{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                    {uniqueError ? t('signup.validation.uniqueError') : formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-dark w-100" disabled={formik.isSubmitting}>{t('signup.submit')}</Button>
              </Form>
            </Card>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
