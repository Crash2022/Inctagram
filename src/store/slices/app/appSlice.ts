import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppStateType {
    isLoading: boolean;
}

const initialState: AppStateType = {
    isLoading: false
};

export const appSlice = createSlice<any, any>({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading;
        }
    }
});

export const { setAppStatus } = appSlice.actions;
export const appReducer = appSlice.reducer;
