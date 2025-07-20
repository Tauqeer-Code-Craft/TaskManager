import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

// Create context with default value
export const UserContext = createContext({
  user: null,
  loading: true,
  updateUser: () => {},
  clearUser: () => {},
});

// Define props for the provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error('User not authenticated', error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // ✅ You forgot to call fetchUser
  }, [user]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;