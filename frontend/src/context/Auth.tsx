import { createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import type { IUser } from '@/types/User';
import useLocalStorage from '@/hooks/useLocalStorage';

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthLayout = () => {
  const [user, setUser] = useLocalStorage<AuthContextType['user']>('user', null);

  const login = (data: IUser): void => {
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
