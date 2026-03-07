import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, Role } from '../types';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: Role) => void;
  logout: () => void;
  signup: (userData: Partial<User>) => void;
  isTawo: boolean;
  isGiya: boolean;
  isAdmin: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem('laagta_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user');
      }
    }
    setIsLoading(false);
  }, []);
  const login = (email: string, role: Role = 'tawo') => {
    // Mock login
    const mockUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      name: email.split('@')[0],
      email,
      role,
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('laagta_user', JSON.stringify(mockUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('laagta_user');
  };
  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      name: userData.name || 'New User',
      email: userData.email || '',
      role: userData.role || 'tawo',
      createdAt: new Date().toISOString(),
      ...userData
    };
    setUser(newUser);
    localStorage.setItem('laagta_user', JSON.stringify(newUser));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
        isTawo: user?.role === 'tawo',
        isGiya: user?.role === 'giya',
        isAdmin: user?.role === 'admin'
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}