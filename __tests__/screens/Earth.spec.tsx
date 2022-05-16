import React from 'react';
import {render} from '@testing-library/react-native';
import Earth from '../../src/screens/Earth';
import {store} from '../../src/app/store';
import {Provider} from 'react-redux';

describe('Testing earth screen', () => {
  test('test render earth', () => {
    render(
      <Provider store={store}>
        <Earth />
      </Provider>,
    );
  });
});
