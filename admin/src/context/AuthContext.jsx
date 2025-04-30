import React, { createContext, useState, useEffect, useContext } from 'react';
// ===== Auth Context Setup =====
// This context holds authentication state (token, role) and methods to login/logout.
export const AuthContext = createContext();

/** Custom hook to access auth context easily */
export const useAuth = () => useContext(AuthContext);

/** AuthProvider sets up auth state and handles storing token/role in localStorage. */
const AuthProvider = ({ children }) => {
  // auth: { token, role, loading } 
  const [auth, setAuth] = useState({ token: null, role: null, loading: true });

  // On mount, load token/role from localStorage if present
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log('Loaded from localStorage:', role);  
    if (token && role) {
      setAuth({ token, role, loading: false });
    } else {
      setAuth({ token: null, role: null, loading: false });
    }
  }, []);



  const login = (token, role) => {
    if (!token || !role) {
      console.error("Invalid login data:", { token, role });
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuth({ token, role, loading: false });
  };
  

  // Call this to logout the user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth({ token: null, role: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;