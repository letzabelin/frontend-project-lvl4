// @ts-check

import { useContext } from 'react';

import WebSocketContext from '../contexts/WebSocketContext.js';

const useWebSocket = () => useContext(WebSocketContext);

export default useWebSocket;
