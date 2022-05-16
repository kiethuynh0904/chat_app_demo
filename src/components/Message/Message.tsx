import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {IMessage} from '../../models/message';
import {Colors} from '../../constants';

type User = {
  name: string;
  id: string;
};

const Message = ({message, user}: {message: IMessage; user: User}) => {
  const isMe = message.user.id === user.id;
  console.log('user', user);
  return (
    <View
      style={[styles.container, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
      <Text style={[styles.text, {color: isMe ? Colors.white : Colors.black}]}>
        {message.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    maxWidth: '60%',
  },
  bubbleLeft: {
    backgroundColor: Colors.lightGrey,
    marginLeft: 10,
    marginRight: 'auto',
  },
  bubbleRight: {
    backgroundColor: Colors.blue,
    marginLeft: 'auto',
    marginRight: 10,
  },
  text: {
    color: '#fff',
  },
});

export default Message;
