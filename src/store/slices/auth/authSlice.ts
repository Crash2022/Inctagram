import { createSlice } from '@reduxjs/toolkit';
import { authAPI, LoginParamsType, RegistrationParamsType } from '@/common/api/auth.api';
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk';

interface AuthStateType {
    profile: any;
    isLoggedIn: boolean;
    isEmailSent: boolean;
}

const initialState: AuthStateType = {
    profile: null as any | null,
    isLoggedIn: false,
    isEmailSent: false
};

const authSlice = createSlice<any, any>({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.profile = null;
            })
            .addCase(recoverPass.fulfilled, (state, action) => {
                state.isEmailSent = action.payload.isEmailSent;
            });
    }
});

export const register = createAppAsyncThunk<{ isLoggedIn: boolean }, RegistrationParamsType>(
    'auth/register',
    async (arg) => {
        await authAPI.register(arg);
        return { isLoggedIn: true };
    }
);

export const login = createAppAsyncThunk<{ profile: any; isLoggedIn: boolean }, LoginParamsType>(
    'auth/login',
    async (arg) => {
        const res = await authAPI.login(arg);
        return { profile: res.data, isLoggedIn: true };
    }
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, any>(
    'auth/logout',
    async (arg) => {
        await authAPI.logout();
        return { isLoggedIn: false };
    }
);

export const recoverPass = createAppAsyncThunk<{ isEmailSent: boolean }, any>(
    'auth/recoverPass',
    async (arg) => {
        await authAPI.recoverPass(arg);
        return { isEmailSent: true };
    }
);

export const authReducer = authSlice.reducer;
