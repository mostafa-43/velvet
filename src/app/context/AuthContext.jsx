import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

const MOCK_USER = { id: 'u1', name: 'mostafa', email: 'mostafa@admin.com', role: 'admin' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('admin_user'); }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    if (username === 'mostafa' && password === '123') {
      localStorage.setItem('admin_user', JSON.stringify(MOCK_USER));
      setUser(MOCK_USER);
      return { user: MOCK_USER, token: 'mock-token' };
    }
    try {
      const data = await authService.login(username, password);
      localStorage.setItem('admin_token', data.token);
      setUser(data.user);
      return data;
    } catch (e) {
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
