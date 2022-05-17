/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../constants';

function AuthScreen() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const onNavigate = () => {
    if (username) {
      let user = {
        name: username,
        id: username.toLowerCase(),
      };

      navigation.navigate('MilkyWay', {user});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setUsername}
          placeholder="enter your planet..."
        />
      </View>
      <Button title="Join Milky Way" onPress={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: Colors.lightGrey2,
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGrey3,
    padding: 8,
    width: '50%',
  },
});

export default AuthScreen;
