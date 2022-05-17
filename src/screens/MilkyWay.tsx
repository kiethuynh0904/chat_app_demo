/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';

import {Message, MessageInput} from '../components';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {selectGroupMessage} from '../app/slices/planetRoomSlice';

import {Colors} from '../constants';
import {SocketContext} from '../context/socketContext';
import {Socket} from 'socket.io-client';

type ParamList = {
  Auth: {
    user: {
      name: string;
      id: string;
    };
  };
};

export const PLANET_ROOM = 'planetRoom'; // default room name

function MilkyWayScreen() {
  const route = useRoute<RouteProp<ParamList, 'Auth'>>();
  const {groupMessage} = useAppSelector(selectGroupMessage);

  const {user} = route.params;
  const socket: Socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('joinPlanetRoom', {user, room: PLANET_ROOM});

    return () => {
      console.log('leave room');
      socket.emit('leavePlanetRoom', {user, room: PLANET_ROOM});
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={groupMessage}
        renderItem={({item}) => <Message user={user} message={item} />}
        inverted
        keyExtractor={item => item.id.toString()}
      />
      <MessageInput subscribe user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default MilkyWayScreen;
