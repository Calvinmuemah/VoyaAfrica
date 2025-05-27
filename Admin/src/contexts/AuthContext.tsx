import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api'; // Axios instance

interface User {
  id: string;
  username: string;
  email: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  location: {
    city: string;
    country: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterFormValues) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const decoded = jwtDecode<{ user: User }>(token);
          setUser(decoded.user);
        } catch (err) {
          localStorage.removeItem('token');
          api.defaults.headers.common['Authorization'] = '';
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  
  const login = async (email: string, password: string) => {
  console.log('Login called with:', email, password);  // log input
  try {
    setLoading(true);
    // console.log('Sending API request...');
    const response = await api.post('http://localhost:4000/api/auth/login', { email, password });
    // console.log('API response:', response.data);
    const { token } = response.data;

    if (!token) {
      console.error('No token received');
      setError('Login failed: no token');
      setLoading(false);
      return false;
    }

    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const decodedToken = jwtDecode<{ user: User }>(token);
    setUser(decodedToken.user);

    setError(null);
    setLoading(false);
    console.log('Login successful');
    return true;
  } catch (error) {
    console.error('Login error:', error);
    setError('Invalid credentials');
    setLoading(false);
    return false;
  }
};



  const register = async (data: RegisterFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Replace this with your actual backend registration route
      const response = await api.post('http://localhost:4000/api/auth/register', data);

      const { token } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const decoded = jwtDecode<{ user: User }>(token);
      setUser(decoded.user);

      console.log('User registered:', decoded.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        register, // ✅ exposed here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
