import { configureStore } from '@reduxjs/toolkit';

import { reducer as userReducer } from './userStore';

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });

  return store;
}

export const store = createStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
