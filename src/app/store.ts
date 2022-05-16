import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import planetRoomReducer from '../app/slices/planetRoomSlice';

export const store = configureStore({
  reducer: {
    planetRoom: planetRoomReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
