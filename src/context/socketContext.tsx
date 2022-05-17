import React from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext(null as any);

const SocketProvider = ({children}) => {
  const ENDPOINT = 'http://127.0.0.1:3000';
  const socket = io(ENDPOINT);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export {SocketContext, SocketProvider};
