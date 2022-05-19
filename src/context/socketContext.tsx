import React from 'react';
import io from 'socket.io-client';
// import {API_KEY} from '@env';

const SocketContext = React.createContext(null as any);

const SocketProvider = ({children}) => {
  const ENDPOINT = 'http://10.231.31.52:3000';
  const socket = io(ENDPOINT);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export {SocketContext, SocketProvider};
