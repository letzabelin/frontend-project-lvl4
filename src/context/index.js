import { createContext } from 'react';
import Cookie from 'js-cookie';

export const UserContext = createContext({ username: Cookie.get('username') });
