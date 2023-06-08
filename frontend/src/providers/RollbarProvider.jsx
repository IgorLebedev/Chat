import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const Rollbar = ({ children }) => {
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: 'production',
  };
  console.log(process.env);
  function TestError() {
    const a = null;
    return a.hello();
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
