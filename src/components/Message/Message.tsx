import {View, Text, StyleSheet, Animated, Pressable} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {IMessage} from '../../models/message';
import {Colors} from '../../constants';
import {Easing} from 'react-native';

type User = {
  name: string;
  id: string;
};

const Message = ({message, user}: {message: IMessage; user: User}) => {
  const isMe = message.user.id === user.id;
  const [showCreatedTime, setShowCreatedTime] = useState(false);
  const translateY = useRef(new Animated.Value(5)).current;

  useEffect(() => {}, []);

  const onPressMessage = () => {
    setShowCreatedTime((oldState: boolean) => {
      if (oldState) {
        Animated.timing(translateY, {
          toValue: 5,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.linear,
        }).start();
      } else {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
      return !oldState;
    });
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        {!isMe && (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {message.user.name.slice(0, 1)}
            </Text>
          </View>
        )}
        <Pressable
          onPress={onPressMessage}
          style={[
            styles.container,
            isMe ? styles.bubbleRight : styles.bubbleLeft,
          ]}>
          <Text
            style={[styles.text, {color: isMe ? Colors.white : Colors.black}]}>
            {message.content}
          </Text>
        </Pressable>
      </View>

      <Animated.View
        style={[styles.timeContainer, {transform: [{translateY: translateY}]}]}>
        {showCreatedTime && (
          <Text>{new Date(message.createdAt).toLocaleDateString()}</Text>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
  },
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
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
  avatarContainer: {
    width: 25,
    height: 25,
    backgroundColor: Colors.black,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  avatarText: {
    color: Colors.white,
  },
});

export default Message;
