import { createContext, ReactNode, useMemo } from 'react';
import { useLocalStorage } from '@/hooks';
import type { IUser } from '@/types';

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
