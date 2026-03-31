import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export interface Track {
    _id: string;
    name: string;
    trackNumber: number;
    duration: string;

    album: {
        _id: string;
        name: string;
        year: number;
    };

    youtubeLink?: string;
}

export const fetchTracks = createAsyncThunk<Track[], string>(
    'tracks/fetchByAlbum',
    async (albumId) => {
        const response = await axiosApi.get(`/tracks?album=${albumId}`);
        return response.data;
    }
);