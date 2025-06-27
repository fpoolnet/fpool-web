/* Core */
import { ICustomError } from '@interfaces/ICustomError';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IPplns } from '@objects/interfaces/IPplns';
import { getPplns, stopPplns } from '@store/app/AppThunks';

/* Instruments */

/* Types */
export interface AppState {
  address?: string;
  pplns: IPplns[];
  isLoading: boolean;
  error?: ICustomError;
}

export const initialState: AppState = {
  address: undefined,
  pplns: [],
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
        state.isLoading = false;
      })
      .addCase(getPplns.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(stopPplns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(stopPplns.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(stopPplns.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

const { reducer: appReducer } = slice;

export const { addPplns, addAddress, clearAddress, clearPplns, setLoader } = slice.actions;

export default appReducer;
