import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MessageInput} from '../../../src/components/';
import {store} from '../../../src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from '../../../src/context/socketContext';
import {useAppDispatch} from '../../../src/app/hook';

describe('Testing earth screen', () => {
  let user = {
    name: 'Test',
    id: 'test',
  };

  test('MessageInput without subscribe', () => {
    let dispatch = jest.fn();

    const component = render(
      <Provider store={store}>
        <SocketProvider>
          <MessageInput user={user} />
        </SocketProvider>
      </Provider>,
    );
    const sendMessageBtn = component.getByTestId('sendMessageBtn');

    fireEvent.press(sendMessageBtn);
    // expect(dispatch).toBeCalledWith(expect.any);
  });
});
