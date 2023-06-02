import { useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(localStorageUser || null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${user.token}` } });

  return (
    <AuthContext.Provider value={{
      getAuthHeader,
      user,
      logIn,
      logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
