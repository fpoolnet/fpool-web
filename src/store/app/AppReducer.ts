/* Core */
import { ICustomError } from '@interfaces/ICustomError';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IPplns } from '@objects/interfaces/IPplns';
import { changeRelay, getPplns, stopPplns } from '@store/app/AppThunks';
import { ISettings } from '@objects/interfaces/ISettings';
import { RELAY_URL } from '@constants/config';

/* Instruments */

/* Types */
export interface AppState {
  address?: string;
  pplns: IPplns[];
  settings: ISettings;
  isLoading: boolean;
  error?: ICustomError;
}

export const initialState: AppState = {
  address: undefined,
  pplns: [],
  settings: { relay: RELAY_URL, network: 'mainnet' },
  isLoading: false,
  error: undefined
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addAddress: (state: AppState, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    clearAddress: (state: AppState) => {
      state.address = undefined;
    },
    clearPplns: (state: AppState) => {
      state.pplns = [];
    },
    setLoader: (state: AppState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addPplns: (state: AppState, action: PayloadAction<IPplns>) => {
      state.pplns = [action.payload, ...state.pplns];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPplns.pending, (state) => {
        state.pplns = [];
        state.isLoading = true;
      })
      .addCase(getPplns.fulfilled, (state) => {
        state.error = undefined;
      })
      .addCase(getPplns.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(stopPplns.pending, (state) => {
        state.error = undefined;
      })
      .addCase(stopPplns.fulfilled, (state) => {
        state.pplns = [];
      })
      .addCase(stopPplns.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(changeRelay.pending, (state) => {
        state.error = undefined;
        state.pplns = [];
        state.address = undefined;
      })
      .addCase(changeRelay.fulfilled, (state, action) => {
        state.settings = {
          ...state.settings,
          relay: action.payload.relay,
          network: action.payload.network
        };
      })
      .addCase(changeRelay.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

const { reducer: appReducer } = slice;

export const { addPplns, addAddress, clearAddress, clearPplns, setLoader } = slice.actions;

export default appReducer;
