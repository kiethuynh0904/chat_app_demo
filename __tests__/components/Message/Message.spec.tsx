import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Message} from '../../../src/components/';
import {store} from '../../../src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from '../../../src/context/socketContext';

describe('Testing message component', () => {
  let user = {
    name: 'Test',
    id: 'test',
  };

  const messageTest = {
    id: 'm1',
    content: 'Hello Mars, now I can see you!',
    createdAt: 1652677931771,
    user: {
      id: 'earth',
      name: 'Earth',
    },
  };

  test('created time should be show when press message', () => {
    const component = render(
      <Provider store={store}>
        <SocketProvider>
          <Message message={messageTest} user={user} />
        </SocketProvider>
      </Provider>,
    );

    const messageBtn = component.getByTestId('messageBtn');

    fireEvent.press(messageBtn);

    const textCreatedAt = component.getByText(
      new Date(messageTest.createdAt).toLocaleDateString(),
    );

    expect(textCreatedAt).toBeTruthy();
  });
});
