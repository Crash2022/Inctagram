import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostStateType {
    photos: string[]
    description: string
}

const initialState: PostStateType = {
    photos: [],
    description: ''
}

export const postSlice = createSlice<any, any>({
    name: 'post',
    initialState,
    reducers: {
        setPhotoToPost: (state, action: PayloadAction<{ photo: string }>) => {
            state.photos = action.payload.photo
        }
    }
})

export const { setPhotoToPost } = postSlice.actions
export const postReducer = postSlice.reducer
