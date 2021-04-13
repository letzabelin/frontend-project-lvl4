import { createContext } from 'react';
import Cookie from 'js-cookie';

const UserContext = createContext({ username: Cookie.get('username') });

export default UserContext;
