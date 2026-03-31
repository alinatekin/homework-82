import { createSlice } from '@reduxjs/toolkit';
import {fetchHistory, type HistoryItem} from './trackHistoryThunks';
import type { RootState } from '../../app/store';

interface TrackHistoryState {
    items: HistoryItem[];
    isFetching: boolean;
}

const initialState: TrackHistoryState = {
    items: [],
    isFetching: false,
};

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHistory.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchHistory.fulfilled, (state, { payload }) => {
            state.items = payload;
            state.isFetching = false;
        });
        builder.addCase(fetchHistory.rejected, (state) => {
            state.isFetching = false;
        });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryFetching = (state: RootState) => state.trackHistory.isFetching;