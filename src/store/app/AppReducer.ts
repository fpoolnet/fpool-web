/* Core */
import { ICustomError } from '@interfaces/ICustomError';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IPplns } from '@objects/interfaces/IPplns';
import { getPplns } from '@store/app/AppThunks';

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
    addPplns: (state: AppState, action: PayloadAction<IPplns>) => {
      const isPplnsExist = !!state.pplns.find((pplns) => pplns.id === action.payload.id);
      if (!isPplnsExist) {
        state.pplns = [action.payload, ...state.pplns].sort(
          (a, b) => b.blockHeight - a.blockHeight
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPplns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPplns.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getPplns.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

const { reducer: appReducer } = slice;

export const { addPplns, addAddress, clearAddress, clearPplns } = slice.actions;

export default appReducer;
