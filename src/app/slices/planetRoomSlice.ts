import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IMessage} from '../../models/message';
import {fetchMessage} from './planetRoomAPI';

export interface PlanetRoomState {
  message: IMessage[];
  status: 'idle' | 'loading' | 'failed';
  groupMessage: IMessage[];
}

const initialState: PlanetRoomState = {
  message: [],
  status: 'idle',
  groupMessage: [],
};

export const getMessage = createAsyncThunk(
  'planetRoom/fetchMessage',
  async () => {
    const response = await fetchMessage();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const planetRoomSlice = createSlice({
  name: 'planetRoom',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    sendMessage: (state, action: PayloadAction<IMessage>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.message.push(action.payload);
    },
    sendGroupMessage: (state, action: PayloadAction<IMessage>) => {
      state.groupMessage.push(action.payload);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: builder => {
    builder
      .addCase(getMessage.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload;
      })
      .addCase(getMessage.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {sendMessage, sendGroupMessage, interactionWithHeart} =
  planetRoomSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMessage = (state: RootState) => {
  let sortMessage: IMessage[] = [];
  let copiedData = [...state.planetRoom.message];

  sortMessage = copiedData.sort((a, b) => b.createdAt - a.createdAt);

  return {message: sortMessage, status: state.planetRoom.status};
};

export const selectGroupMessage = (state: RootState) => {
  let sortMessage: IMessage[] = [];
  let copiedData = [...state.planetRoom.groupMessage];

  sortMessage = copiedData.sort((a, b) => b.createdAt - a.createdAt);

  return {groupMessage: sortMessage};
};
export default planetRoomSlice.reducer;
