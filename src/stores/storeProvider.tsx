'use client';
import { Provider } from 'react-redux';
import { createStore } from './index';
import React from 'react';
import type { UserState } from './userStore/User';

export function StoreProvider({ children, preloadedState }: { children: React.ReactNode; preloadedState: UserState }) {
  const store = createStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
}
