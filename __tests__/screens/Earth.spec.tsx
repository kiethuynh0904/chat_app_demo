import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Earth from '../../src/screens/Earth';
import {store} from '../../src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from '../../src/context/socketContext';

describe('Testing earth screen', () => {
  test('test render earth', () => {
    render(
      <Provider store={store}>
        <SocketProvider>
          <Earth />
        </SocketProvider>
      </Provider>,
    );
  });
});
