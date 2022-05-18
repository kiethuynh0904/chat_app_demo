/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import {Message, MessageInput} from '../components';
import {Colors} from '../constants';
import {getMessage, selectMessage} from '../app/slices/planetRoomSlice';
import {useAppDispatch, useAppSelector} from '../app/hook';

const EARTH = {
  name: 'Earth',
  id: 'earth',
};

function EarthScreen() {
  const {message, status} = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();

  console.log({message, status});

  useEffect(() => {
    dispatch(getMessage());
  }, []);

  if (status === 'loading') {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator testID="loading" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        testID="messageList"
        data={message}
        renderItem={({item}) => <Message user={EARTH} message={item} />}
        inverted
        keyExtractor={item => item.id.toString()}
      />
      <MessageInput user={EARTH} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default EarthScreen;
