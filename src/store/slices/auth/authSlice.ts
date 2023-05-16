import { createSlice } from '@reduxjs/toolkit'
import { authAPI } from '@/shared/api/auth.api'
import { createAppAsyncThunk } from '@/shared/utils/createAppAsyncThunk'
import { AxiosError } from 'axios'
import { LoginPayloadType, RegistrationPayloadType } from '@/models/auth-types'

interface AuthStateType {
    profile: any
    isLoggedIn: boolean
    isEmailSent: boolean
}

const initialState: AuthStateType = {
    profile: null as any | null,
    isLoggedIn: false,
    isEmailSent: false
}

const authSlice = createSlice<any, any>({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(login.fulfilled, (state, action) => {
                state.profile = action.payload.profile
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
                state.profile = null
            })
            .addCase(recoverPass.fulfilled, (state, action) => {
                state.isEmailSent = action.payload.isEmailSent
            })
    }
})

export const register = createAppAsyncThunk<{ isLoggedIn: boolean }, RegistrationPayloadType>(
    'auth/register',
    async (data, thunkAPI) => {
        try {
            await authAPI.register(data)
            return { isLoggedIn: true }
        } catch (err: any | AxiosError) {
            return thunkAPI.rejectWithValue({
                message: err.response.message,
                fields: err.response.fields
            })
        }
    }
)

export const login = createAppAsyncThunk<{ profile: any; isLoggedIn: boolean }, LoginPayloadType>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const res = await authAPI.login(data)
            return { profile: res.data, isLoggedIn: true }
        } catch (err: any | AxiosError) {
            return thunkAPI.rejectWithValue({
                message: err.response.message,
                fields: err.response.fields
            })
        }
    }
)

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, any>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await authAPI.logout()
            return { isLoggedIn: false }
        } catch (err: any | AxiosError) {
            return thunkAPI.rejectWithValue({
                message: err.response.message,
                fields: err.response.fields
            })
        }
    }
)

export const recoverPass = createAppAsyncThunk<{ isEmailSent: boolean }, any>(
    'auth/recoverPass',
    async (data, thunkAPI) => {
        try {
            await authAPI.recoverPass(data)
            return { isEmailSent: true }
        } catch (err: any | AxiosError) {
            return thunkAPI.rejectWithValue({
                message: err.response.message,
                fields: err.response.fields
            })
        }
    }
)

export const authReducer = authSlice.reducer
