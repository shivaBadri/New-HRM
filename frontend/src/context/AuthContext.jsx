import React, { createContext, useContext, useState } from 'react';
import api from '../api';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('risehr_user') || 'null'));
  const login = async (email, password) => { const { data } = await api.post('/api/auth/login', { email, password }); localStorage.setItem('risehr_token', data.token); localStorage.setItem('risehr_user', JSON.stringify(data.user)); setUser(data.user); };
  const logout = () => { localStorage.removeItem('risehr_token'); localStorage.removeItem('risehr_user'); setUser(null); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
