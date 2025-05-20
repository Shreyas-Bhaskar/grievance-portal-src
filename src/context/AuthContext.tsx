import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Role = 'admin' | 'user';

type User = {
  username: string;
  isLoggedIn: boolean;
  role: Role;
};

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const defaultUser: User = {
  username: '',
  isLoggedIn: false,
  role: 'user',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const trimmed = username.trim().toLowerCase();
    if (trimmed && password.trim()) {
      const role: Role = trimmed === 'shreyas' ? 'admin' : 'user';
      const newUser: User = {
        username: trimmed,
        isLoggedIn: true,
        role,
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(defaultUser);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
