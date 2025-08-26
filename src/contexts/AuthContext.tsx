import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from './UserRoleContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  agentId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
  createUser: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  getAllUsers: () => User[];
  deleteUser: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Default demo users
const defaultUsers = [
  {
    id: '1',
    name: 'Muhammad Zayan',
    email: 'admin@igilife.com',
    role: 'admin' as UserRole,
    department: 'Administration',
    agentId: 'ADM001',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    email: 'agent@igilife.com',
    role: 'agent' as UserRole,
    department: 'Sales',
    agentId: 'AGT001',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Ahmed Ali',
    email: 'client@igilife.com',
    role: 'user' as UserRole,
    department: 'Client',
    password: 'password123'
  }
];

// User storage with passwords
interface UserWithPassword extends User {
  password: string;
}

// Initialize users in localStorage if not exists
const initializeUsers = (): UserWithPassword[] => {
  const storedUsers = localStorage.getItem('igilife_users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  } else {
    localStorage.setItem('igilife_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
};

// Get all users from localStorage
const getStoredUsers = (): UserWithPassword[] => {
  const storedUsers = localStorage.getItem('igilife_users');
  return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
};

// Save users to localStorage
const saveUsers = (users: UserWithPassword[]): void => {
  localStorage.setItem('igilife_users', JSON.stringify(users));
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication logic
    if (password === 'password123') {
      const foundUser = mockUsers[email.toLowerCase()];
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
