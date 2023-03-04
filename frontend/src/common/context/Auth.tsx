import {
  createContext,
  ReactNode,
  useState,
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

const getExistedUser = (storageItem: string | null) => {
  const user: User | null = storageItem ? JSON.parse(storageItem) : null;

  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setStorageItem, deleteStorageItem, getStorageItem } = useLocalStorage();
  const [currentUser, setCurrentUser] = useState<User | null>(getExistedUser(getStorageItem('user')));

  const login = (user: User) => {
    setCurrentUser(user);
    setStorageItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    deleteStorageItem('user');
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
