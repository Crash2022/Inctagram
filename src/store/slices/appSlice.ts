import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncThunkType } from '@/store/store'
import { AxiosError } from 'axios'

type ErrorStatusType = 'default' | 'error' | 'success'

interface AppStateType {
    isLoading: boolean
    error: ErrorStatusType
}

const initialState: AppStateType = {
    isLoading: false,
    error: 'default'
}

export const appSlice = createSlice<any, any>({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        }
    }
})

export const getUserData = createAsyncThunk<undefined, undefined, AsyncThunkType>(
    'app/getUserData',
    async (data, thunkAPI) => {
        try {
            // if (localStorage.getItem('accessToken')) {
            //     await thunkAPI.dispatch(checkAuth());
            // }
            // const auth = thunkAPI.getState().auth;
            // if (auth.role === 'S_ADMIN') {
            //     const response = await s_adminApi.getSAdminUser(auth.id);
            //     thunkAPI.dispatch(setDataSAdmin(response));
            // } else {
            //     const response = await adminApi.getAdminUser(auth.id);
            //     thunkAPI.dispatch(setDataAdmin(response));
            // }
        } catch (err: any | AxiosError) {
            return thunkAPI.rejectWithValue({ message: 'Произошла ошибка' })
        }
    }
)

export const { setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer
