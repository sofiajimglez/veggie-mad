import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersService from '../services/users';
import businessesService from '../services/businesses';


const AuthContext = createContext();

const restoreUserFromLocalStorage = () => {
  const user = localStorage.getItem('current-user');
  if (user) {
    return JSON.parse(user);
  } else {
    return undefined;
  };
};

function AuthUserStore({ children }) {
  const [user, setUser] = useState(restoreUserFromLocalStorage);
  const navigate = useNavigate();

  const handleUserChange = useCallback((userToUpdate) => {
    if (userToUpdate && !userToUpdate.token && user?.token) {
      userToUpdate.token = user.token;
    }

    if (JSON.stringify(userToUpdate) !== JSON.stringify(user)) {
      console.info('Updated user context', userToUpdate);
      if (!userToUpdate) {
        localStorage.removeItem('current-user');
        localStorage.removeItem('user-access-token');
      } else {
        localStorage.setItem('current-user', JSON.stringify(userToUpdate));
        localStorage.setItem('user-access-token', userToUpdate.token);
      }
      setUser(userToUpdate);
    }
  }, [user]);
  
  useEffect(() => {
    async function fetchUser() {
      if (user && user.role === 'user') {
        const profile = await usersService.get(user.id);
        handleUserChange({ ...profile, token: user.token });
      } else if (user && user.role === 'business') {
        const profile = await businessesService.get(user.id);
        handleUserChange({ ...profile, token: user.token });
      }
    };
    fetchUser();
  }, [handleUserChange])


  const logout = useCallback(() => {
    handleUserChange();
    navigate('/');
  }, [handleUserChange, navigate]);

  return (
    <AuthContext.Provider value={{ user, logout, onUserChange: handleUserChange }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthUserStore as default, AuthContext };
