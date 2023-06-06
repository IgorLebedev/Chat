import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SpinnerComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{t('spinner.loading')}</span>
        </div>
      </Container>
    </div>
  );
};

export default SpinnerComponent;
