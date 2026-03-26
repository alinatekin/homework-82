import { createSlice } from '@reduxjs/toolkit';
import {type Artist, fetchArtists} from "./artistsThunks.ts";
import type {RootState} from "../../app/store.ts";

interface ArtistsState {
    items: Artist[];
    isFetching: boolean;
}

const initialState: ArtistsState = {
    items: [],
    isFetching: false,
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
        });
        builder.addCase(fetchArtists.rejected, (state) => {
            state.isFetching = false;
        });
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsFetching = (state: RootState) => state.artists.isFetching;