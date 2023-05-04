import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AsyncThunkType } from '@/store/store';

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
            return thunkAPI.rejectWithValue({ message: 'Произошла ошибка' });
        }
    }
);
