import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit';
import { errorMiddleware } from '@middlewares/ErrorMiddleware';
import { loggerMiddleware } from '@middlewares/LoggerMiddleware';
import rootReducer from './rootReducer';

export const AppStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(loggerMiddleware, errorMiddleware)
});

export type ReduxState = ReturnType<typeof AppStore.getState>;
export type ReduxDispatch = ThunkDispatch<ReduxState, unknown, Action>;

export const useDispatch: () => ReduxDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof AppStore;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
