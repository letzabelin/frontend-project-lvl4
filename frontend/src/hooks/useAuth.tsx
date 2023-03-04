import { useContext } from 'react';
import { AuthContext } from '@/context/Auth';

// eslint-disable-next-line arrow-body-style
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
