import React from 'react';
import {useColorScheme} from 'react-native';

import Navigation from './src/router/Navigator';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from './src/context/socketContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SocketProvider>
        <Navigation isDarkMode={isDarkMode} />
      </SocketProvider>
    </Provider>
  );
};

export default App;
