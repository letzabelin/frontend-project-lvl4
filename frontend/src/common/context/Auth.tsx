import {
  createContext,
  ReactNode,
} from 'react';
import type { User } from '@/common/types/User';
import useLocalStorage from '@/common/hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setStorageItem, deleteStorageItem, getStorageItem } = useLocalStorage();

  const userStorageItem = getStorageItem('user');

  const currentUser = userStorageItem ? JSON.parse(userStorageItem) : null;

  const login = (user: User) => {
    setStorageItem('user', JSON.stringify(user));
  };

  const logout = () => {
    deleteStorageItem('user');
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
