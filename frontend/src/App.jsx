import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState, useContext } from 'react';
import NotFound from './components/notFound.jsx';
import MainPage from './components/mainPage.jsx';
import Login from './components/login.jsx';
import AuthContext from './contexts/index.jsx';
import Navigation from './components/navbar.jsx';

const AuthProvider = ({ children }) => {
  const [isLogged, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    console.log(localStorage);
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
  const { isLogged } = useContext(AuthContext);
  return (
    token || isLogged ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Navigation />
      <BrowserRouter>
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
