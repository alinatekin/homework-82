import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import type {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from "../../types";

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
    'users/register',
    async (registerMutation, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<{user: User}>('/users', registerMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
    'users/login',
    async (loginMutation, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<{user: User}>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async () => {
        await axiosApi.delete('/users/sessions');
    }
);