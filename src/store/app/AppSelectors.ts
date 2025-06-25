/* Instruments */
import type { ReduxState } from '@store/store';

export const getAddress = (state: ReduxState) => state.app.address;
export const getPplns = (state: ReduxState) => state.app.pplns;
export const getPplnsCount = (state: ReduxState) => state.app.pplns.length;
export const getIsLoading = (state: ReduxState) => state.app.isLoading;
