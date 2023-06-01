import React from 'react';
import { Container } from 'react-bootstrap';

const SpinnerComponent = () => (
  <div className="h-100 d-flex justify-content-center align-items-center">
    <Container className="d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  </div>
);

export default SpinnerComponent;
