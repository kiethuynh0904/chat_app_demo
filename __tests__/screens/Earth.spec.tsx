import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Earth from '../../src/screens/Earth';
import {store} from '../../src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from '../../src/context/socketContext';

describe('Testing earth screen', () => {
  test('loading should be render before list display', () => {
    const screen = render(
      <Provider store={store}>
        <SocketProvider>
          <Earth />
        </SocketProvider>
      </Provider>,
    );

    const loadingComp = () => screen.getByTestId('messageList');
    expect(loadingComp).toBeTruthy();
  });

  test('test render flatlist', async () => {
    const screen = render(
      <Provider store={store}>
        <SocketProvider>
          <Earth />
        </SocketProvider>
      </Provider>,
    );

    const FlatlistComp = await waitFor(() => screen.getByTestId('messageList'));

    expect(FlatlistComp).toBeTruthy();
    expect(FlatlistComp.props.data.length).toBe(4);
  });
});
