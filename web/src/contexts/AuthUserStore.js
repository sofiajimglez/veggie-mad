import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthUserStore({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleUserChange = (user) => {
    console.info('Updated user context', user);
    if (!user) {
      localStorage.removeItem('user-access-token');
    } else {
      localStorage.setItem('user-access-token', user.token);
    }
    setUser(user);
  };

  const logout = () => {
    handleUserChange();
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, logout, onUserChange: handleUserChange }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthUserStore as default, AuthContext};
