import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MarsScreen, EarthScreen} from './routes';
import {useWindowDimensions, View, Text, Image} from 'react-native';

const EarthAvatar =
  'https://static.wikia.nocookie.net/avatar/images/5/59/Planet_Earth.png/revision/latest/scale-to-width-down/444?cb=20140920231628';

const MarsAvatar =
  'https://i.pinimg.com/564x/ef/03/75/ef037565fab4531b56706172f5111038.jpg';

const Tab = createBottomTabNavigator();

export default function Navigation({isDarkMode}: {isDarkMode: boolean}) {
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Earth"
          component={EarthScreen}
          options={{
            headerTitle: props => (
              <PlanetRoomHeader {...props} uri={EarthAvatar} />
            ),
            tabBarIcon: () => null,
          }}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => null,
            headerTitle: props => (
              <PlanetRoomHeader {...props} uri={MarsAvatar} />
            ),
          }}
          name="Mars"
          component={MarsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const PlanetRoomHeader = (props: any) => {
  const {width} = useWindowDimensions();
  const {children, uri} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width,
        padding: 10,
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri,
        }}
        style={{width: 30, height: 30, borderRadius: 30}}
      />
      <Text style={{flex: 1, fontWeight: 'bold', marginLeft: 10}}>
        {children}
      </Text>
    </View>
  );
};
