import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { apiMapping } from 'services';
import { reducer as common } from '_redux';
import { reducer as wallet } from './components/Wallet/_redux';

const reducerList = {
  common,
  wallet,
};

export const rootReducer = combineReducers(reducerList);

const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk.withExtraArgument({ ...apiMapping })]
});

export default store;
export type AppState = ReturnType<typeof rootReducer>;
