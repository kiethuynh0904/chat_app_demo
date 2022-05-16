import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors} from '../../constants';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sendMessage} from '../../app/slices/planetRoomSlice';
import {useAppDispatch} from '../../app/hook';
import {IMessage} from '../../models/message';

type User = {
  name: string;
  id: string;
};

const MessageInput = ({user}: {user: User}) => {
  const dispatch = useAppDispatch();
  const [msg, setMsg] = useState('');

  const onSendMessage = () => {
    let uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const timeElapsed = Date.now();

    let message: IMessage = {
      id: uniqueId,
      content: msg,
      createdAt: timeElapsed,
      user,
    };
    setMsg('');
    dispatch(sendMessage(message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <View style={styles.inputContainer}>
        <SimpleLineIcons name="emotsmile" size={20} style={styles.icon} />
        <TextInput
          clearButtonMode="always"
          value={msg}
          onChangeText={nextMessage => setMsg(nextMessage)}
          placeholder="Aa"
          style={styles.input}
        />
      </View>
      <Pressable onPress={onSendMessage} style={styles.buttonContainer}>
        <Ionicons name="ios-send" size={18} color={Colors.white} />
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    backgroundColor: Colors.lightGrey2,
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGrey3,
    padding: 8,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 45,
    height: 45,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MessageInput;
