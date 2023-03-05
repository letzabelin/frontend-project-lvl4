import { createContext, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
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

export const AuthLayout = () => {
  const [user, setUser] = useLocalStorage<AuthContextType['user']>('user', null);

  const login = (data: User): void => {
    setUser(data);
  };

  const logout = (): void => {
    setUser(null);
  };

  const auth = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={auth}>
      <Outlet />
    </AuthContext.Provider>
  );
};
