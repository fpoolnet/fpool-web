import MiningService from '@services/api/MiningService';
import { createAppAsyncThunk } from '@store/createAppAsyncThunk';
import { addPplns } from './AppReducer';

export const getPplns = createAppAsyncThunk(
  'relay/getPplns',
  async (address: string, { rejectWithValue, dispatch }) => {
    try {
      const observable$ = MiningService.subscribePplns(address);
      observable$.subscribe({
        next: (pplns) => {
          dispatch(addPplns(pplns));
        },
        error: (err) => {
          throw err;
        }
      });
    } catch (err: any) {
      return rejectWithValue({
        message: err?.message,
        code: err.code,
        status: err.status
      });
    }
  }
);
