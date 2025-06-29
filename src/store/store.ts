import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit';
import { errorMiddleware } from '@middlewares/ErrorMiddleware';
import { loggerMiddleware } from '@middlewares/LoggerMiddleware';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'fpool',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(loggerMiddleware, errorMiddleware)
});

export type ReduxState = ReturnType<typeof AppStore.getState>;
export type ReduxDispatch = ThunkDispatch<ReduxState, unknown, Action>;

export const persistor = persistStore(AppStore);
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
