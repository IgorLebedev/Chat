import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const Rollbar = ({ children }) => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Provider>
  );
};

export default Rollbar;
