/* eslint-disable no-useless-catch */
import { useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.jsx';
import { serverRoutes } from '../routes/routes.js';

const AuthProvider = ({ children }) => {
  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(localStorageUser || null);

  const saveUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const logIn = async (userData) => {
    const { data: { token } } = await axios.post(serverRoutes.login(), userData);
    saveUser({ username: userData.username, token });
  };

  const signUp = async (userData) => {
    const { data: { token } } = await axios.post(serverRoutes.signup(), userData);
    saveUser({ username: userData.username, token });
  };

  const getAuthHeader = () => ({ headers: { Authorization: `Bearer ${user.token}` } });

  const fetchData = async () => {
    const { data } = await axios.get(serverRoutes.data(), getAuthHeader());
    return data;
  };

  return (
    <AuthContext.Provider value={{
      getAuthHeader,
      user,
      logIn,
      signUp,
      logOut,
      fetchData,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
