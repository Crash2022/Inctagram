import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const { setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer

export type ErrorStatusType = 'default' | 'error' | 'success'
