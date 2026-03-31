import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type { RootState } from '../../app/store';

export interface HistoryItem {
    _id: string;
    track: { _id: string; name: string };
    artist: { _id: string; name: string };
    datetime: string;
}

export const addTrackToHistory = createAsyncThunk<void, string, { state: RootState }>(
    'trackHistory/add',
    async (trackId, { getState }) => {
        const token = getState().users.user?.token;

        await axiosApi.post('/track_history', { track: trackId }, {
            headers: { 'Authorization': token }
        });
    }
);

export const fetchHistory = createAsyncThunk<HistoryItem[], void, { state: RootState }>(
    'trackHistory/fetch',
    async (_, { getState }) => {
        const token = getState().users.user?.token;

        const response = await axiosApi.get<HistoryItem[]>('/track_history', {
            headers: { 'Authorization': token }
        });
        return response.data;
    }
);