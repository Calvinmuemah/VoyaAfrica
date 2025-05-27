import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
// import { BASE_URL } from '../config'; // your base backend API URL, e.g., http://localhost:5000/api

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  verifyResetCode: (code: string) => Promise<void>;
  setNewPassword: (code: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== "undefined") {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('user'); // Clean up bad data
    }
  }
  setIsLoading(false);
}, []);


  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4500/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid login credentials');

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  location: string = '' // Optional: default empty string if not provided
) => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:4500/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        phone_number: phone, // renamed to match backend
        location
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // Backend doesn't return a user/token, only a message
    const data = await response.json();
    console.log('Registration success:', data.message);

    // Optionally: redirect to login or notify UI
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};


  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('http://localhost:4500/api/resets-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to send reset email');
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  };

  const verifyResetCode = async (code: string) => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Invalid or expired reset code');
    } catch (error) {
      console.error('Code verification failed:', error);
      throw error;
    }
  };

  const setNewPassword = async (code: string, newPassword: string) => {
    try {
      const response = await fetch('http://localhost:4500/api/verify-reset-token/:token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, newPassword }),
      });

      if (!response.ok) throw new Error('Failed to set new password');
    } catch (error) {
      console.error('Set new password failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        verifyResetCode,
        setNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
