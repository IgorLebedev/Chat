import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const Rollbar = ({ children }) => {
  const rollbarConfig = {
    accessToken: '57f302e0546849e184c330ff966f9c07',
    environment: 'testenv',
  };

  function TestError() {
    return 'error';
  }
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        {children}
      </ErrorBoundary>
    </Provider>
  );
};

export default Rollbar;
