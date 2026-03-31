import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { register, login, logout } from './usersThunks';
import type {GlobalError, User, ValidationError} from "../../types";

interface UsersState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.registerLoading = false;
            state.user = payload;
        });
        builder.addCase(register.rejected, (state, { payload: error }) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });

        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loginLoading = false;
            state.user = payload;
        });
        builder.addCase(login.rejected, (state, { payload: error }) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });


        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
        });
        builder.addCase(logout.rejected, (state) => {
            state.user = null;
        });
    }
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;