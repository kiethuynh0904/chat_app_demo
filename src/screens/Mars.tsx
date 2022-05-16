import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import {getMessage, selectMessage} from '../app/slices/planetRoomSlice';
import {Message, MessageInput} from '../components';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {Colors} from '../constants';

const MARS = {
  name: 'Mars',
  id: 'mars',
};

function MarsScreen() {
  const {message, status} = useAppSelector(selectMessage);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getMessage());
  }, []);

  if (status === 'loading') {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={message}
        renderItem={({item}) => <Message user={MARS} message={item} />}
        inverted
        keyExtractor={item => item.id.toString()}
      />
      <MessageInput user={MARS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default MarsScreen;
