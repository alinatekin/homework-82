import { createSlice } from '@reduxjs/toolkit';
import {type Album, fetchAlbums} from './albumsThunks';
import type { RootState} from '../../app/store';

interface AlbumsState {
    items: Album[];
    isFetching: boolean;
}

const initialState: AlbumsState = {
    items: [],
    isFetching: false,
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isFetching = false;
        });
        builder.addCase(fetchAlbums.rejected, (state) => {
            state.isFetching = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.isFetching;