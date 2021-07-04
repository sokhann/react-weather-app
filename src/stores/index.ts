import { createStore } from 'redux';

import { CityStateProps, cityReducers } from './cityStore';

const saveToLocalStorage = (state: CityStateProps) => {
  const serialisedState = JSON.stringify(state);
  localStorage.setItem("state", serialisedState);
}

const loadFromLocalStorage = () => {
  const serialisedState = localStorage.getItem("state");
  
  if (!serialisedState) return;

  return JSON.parse(serialisedState);
}

export const store = createStore(
  cityReducers,
  loadFromLocalStorage()
);

store.subscribe(() => saveToLocalStorage(store.getState()));