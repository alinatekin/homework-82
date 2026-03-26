import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export interface Artist {
    _id: string;
    name: string;
    photo: string | null;
    information: string | null;
}

export const fetchArtists = createAsyncThunk<Artist[]>(
    'artists/fetchAll',
    async () => {
        const response = await axiosApi.get('/artists');
        return response.data;
    }
);