import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export interface Album {
    _id: string;
    name: string;
    year: number;
    image: string | null;
    artist: {
        _id: string;
        name: string;
    };
}

export const fetchAlbums = createAsyncThunk<Album[], string>(
    'albums/fetchByArtist',
    async (artistId) => {
        const response = await axiosApi.get(`/albums?artist=${artistId}`);
        return response.data;
    }
);