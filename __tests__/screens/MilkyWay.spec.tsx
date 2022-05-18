import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import MilkyWay from '../../src/screens/MilkyWay';
import {store} from '../../src/app/store';
import {Provider} from 'react-redux';
import {SocketProvider} from '../../src/context/socketContext';
import * as hooks from '../../src/app/hook';

const mockData = [
  {
    id: 'm1',
    content: 'Hello Mars, now I can see you!',
    createdAt: 1652677931771,
    user: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 'm2',
    content: 'Oh! hi Earth, where are you from ?',
    createdAt: 1652677941993,
    user: {
      id: 'mars',
      name: 'Mars',
    },
  },
  {
    id: 'm3',
    content: 'I am in the same solar system as you?',
    createdAt: 1652677952156,
    user: {
      id: 'earth',
      name: 'Earth',
    },
  },
  {
    id: 'm4',
    content: 'Oh really! Im really happy to have new friends.',
    createdAt: 1652677969212,
    user: {
      id: 'mars',
      name: 'Mars',
    },
  },
];

let user = {
  name: 'Test',
  id: 'test',
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({goBack: jest.fn()}),
  useRoute: () => ({
    params: {
      user,
    },
  }),
}));

describe('Testing milkyway screen', () => {
  test('test render flatlist', async () => {
    const screen = render(
      <Provider store={store}>
        <SocketProvider>
          <MilkyWay />
        </SocketProvider>
      </Provider>,
    );
    expect(screen).toMatchSnapshot();
  });

  test('test render item', async () => {
    jest
      .spyOn(hooks, 'useAppSelector')
      .mockReturnValue({groupMessage: mockData});

    const screen = render(
      <Provider store={store}>
        <SocketProvider>
          <MilkyWay />
        </SocketProvider>
      </Provider>,
    );
    const FlatlistComp = await waitFor(() => screen.getByTestId('messageList'));
    expect(FlatlistComp).toBeTruthy();
    expect(FlatlistComp.props.data.length).toBe(mockData.length);
  });
});
