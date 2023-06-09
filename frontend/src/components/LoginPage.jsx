import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button, Container, Form, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts/AuthContext.jsx';
import { appRoutes } from '../routes/routes.js';

const Login = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const [validateError, setValidateError] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        await logIn({ username, password });
        setValidateError(false);
        navigate(appRoutes.mainPage());
      } catch (error) {
        if (error.request.status === 401) {
          setValidateError(true);
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
          <Card>
            <Card.Body className="flex-column body row p-5">
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="username"
                    ref={inputEl}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={validateError}
                    placeholder="username"
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={validateError}
                    placeholder="password"
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                    {t('login.validation.invalidLogin')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 btn btn-dark" disabled={formik.isSubmitting}>
                  {t('login.submit')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('login.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
