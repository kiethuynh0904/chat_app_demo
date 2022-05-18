import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MessageInput} from '../../../src/components/';
import {store} from '../../../src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from '../../../src/context/socketContext';

describe('Testing message input component', () => {
  let user = {
    name: 'Test',
    id: 'test',
  };

  test('message input snapshot', () => {
    const component = render(
      <Provider store={store}>
        <SocketProvider>
          <MessageInput user={user} />
        </SocketProvider>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  test('message input should be empty', () => {
    const component = render(
      <Provider store={store}>
        <SocketProvider>
          <MessageInput user={user} />
        </SocketProvider>
      </Provider>,
    );
    const messageInp = component.getByPlaceholderText('Aa') as any;
    expect(messageInp.props.value).toBe('');
  });

  test('message input should be changed', () => {
    const component = render(
      <Provider store={store}>
        <SocketProvider>
          <MessageInput user={user} />
        </SocketProvider>
      </Provider>,
    );
    const messageInp = component.getByPlaceholderText('Aa') as any;
    fireEvent.changeText(messageInp, 'hello world');
    expect(messageInp.props.value).toBe('hello world');
  });

  test('message input should be clear text when submit', () => {
    const component = render(
      <Provider store={store}>
        <SocketProvider>
          <MessageInput user={user} />
        </SocketProvider>
      </Provider>,
    );

    const sendMsgBtn = component.getByTestId('sendMessageBtn');
    const messageInp = component.getByPlaceholderText('Aa') as any;

    fireEvent.changeText(messageInp, 'hello world');
    fireEvent.press(sendMsgBtn);

    expect(messageInp.props.value).toBe('');
  });
});
