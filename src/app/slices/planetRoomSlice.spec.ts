import planetReducer, {
  sendMessage,
  sendGroupMessage,
  PlanetRoomState,
  getMessage,
  selectMessage,
} from './planetRoomSlice';

const messageTest = {
  id: 'm1',
  content: 'Hello Mars, now I can see you!',
  createdAt: 1652677931771,
  user: {
    id: 'earth',
    name: 'Earth',
  },
};

describe('planet room reducer', () => {
  const initialState: PlanetRoomState = {
    message: [],
    status: 'idle',
    groupMessage: [],
  };
  it('should handle initial state', () => {
    expect(planetReducer(undefined, {type: 'unknown'})).toEqual({
      message: [],
      status: 'idle',
      groupMessage: [],
    });
  });

  it('should handle send message', () => {
    const actual = planetReducer(initialState, sendMessage(messageTest));
    expect(actual).toEqual({
      message: [messageTest],
      status: 'idle',
      groupMessage: [],
    });
  });

  it('should handle send group message', () => {
    const actual = planetReducer(initialState, sendGroupMessage(messageTest));
    expect(actual).toEqual({
      message: [],
      status: 'idle',
      groupMessage: [messageTest],
    });
  });
  // it('should handle get default message by fake API', () => {
  //   const previousState = [] as any;
  //   const actual = planetReducer(previousState, getMessage());
  //   expect(actual.groupMessage).toEqual([messageTest]);
  // });
});
