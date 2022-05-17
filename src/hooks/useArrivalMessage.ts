/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef, useState} from 'react';
import {Socket} from 'socket.io-client';
import {IMessage} from '../models/message';

export function useArrivalMessage(socket: Socket) {
  const [arrivalMsg, setArrivalMsg] = useState<IMessage>();

  useEffect(() => {
    socket.on('getMessage', (newMsg: IMessage) => {
      setArrivalMsg(newMsg);
    });
  }, []);

  return {arrivalMsg};
}
