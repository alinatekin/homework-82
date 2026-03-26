import { createSlice } from '@reduxjs/toolkit';
import {fetchTracks, type Track} from './tracksThunks';
import type { RootState } from '../../app/store';

interface TracksState {
    items: Track[];
    isFetching: boolean;
}

const initialState: TracksState = {
    items: [],
    isFetching: false,
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
        });
        builder.addCase(fetchTracks.rejected, (state) => {
            state.isFetching = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksFetching = (state: RootState) => state.tracks.isFetching;