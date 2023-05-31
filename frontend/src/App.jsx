import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NotFound from './components/notFound.jsx';
import MainPage from './components/mainPage.jsx';
import Login from './components/login.jsx';
import Navigation from './components/navbar.jsx';
import SignUp from './components/signup.jsx';
import AuthProvider from './providers/authProvider.jsx';
import SocketProvider from './providers/socketProvider.jsx';

const MainRoute = ({ children }) => {
  const { user } = localStorage;
  return (
    user ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <SocketProvider>
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
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  </SocketProvider>
);

export default App;
