import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

// Define a type for the user object
interface User {
  token: string;
  [key: string]: any; // if your user object has more fields
}

// Define the shape of your context
interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

// Create context with default value
export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  updateUser: () => {},
  clearUser: () => {},
});

// Define props for the provider
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const updateUser = (userData: User) => {
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
