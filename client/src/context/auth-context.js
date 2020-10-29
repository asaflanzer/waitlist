import React, { createContext, useState } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    token: '',
    userId: '',
    tokenExpiration: '',
  });

  const login = (token, userId, tokenExpiration) => {
    setUser({ token, userId, tokenExpiration });
  };

  const logout = () => {
    setUser({ token: '', userId: '', tokenExpiration: '' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
