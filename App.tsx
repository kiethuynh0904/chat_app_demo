import React from 'react';
import {useColorScheme} from 'react-native';

import Navigation from './src/router/Navigator';
import {store} from './src/app/store';
import {Provider} from 'react-redux';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <Navigation isDarkMode={isDarkMode} />
    </Provider>
  );
};

export default App;
