import MiningService from '@services/api/MiningService';
import { createAppAsyncThunk } from '@store/createAppAsyncThunk';
import { addPplns, clearPplns, setLoader } from './AppReducer';
import { beautify } from '@utils/beautifierUtils';

export const getPplns = createAppAsyncThunk(
  'relay/getPplns',
  async (address: string, { rejectWithValue, dispatch }) => {
    try {
      MiningService.subscribePplns(address, {
        onevent: (event) => {
          const pplns = beautify(event);
          dispatch(addPplns(pplns));
        },
        oneose: () => {
          setTimeout(() => {
            dispatch(setLoader(false));
          }, 500);
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

export const stopPplns = createAppAsyncThunk('relay/stopPplns', async (_, { rejectWithValue }) => {
  try {
    MiningService.stopPplns();
    return;
  } catch (err: any) {
    return rejectWithValue({
      message: err?.message,
      code: err.code,
      status: err.status
    });
  }
});
