import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotFound from './components/notFound.jsx';
import MainPage from './components/mainPage.jsx';
import Login from './components/login.jsx';
import AuthContext from './contexts/index.jsx';
import Navigation from './components/navbar.jsx';

const AuthProvider = ({ children }) => {
  const [isLogged, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setLoggedIn(true);
    }
  }, []);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const MainRoute = ({ children }) => {
  const { token } = localStorage;
  return (
    token ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={(
              <MainRoute>
                <MainPage />
              </MainRoute>
            )}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
);

export default App;
