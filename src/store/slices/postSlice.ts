import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostStateType {
    photos: string[]
    description: string
    postId: null | number
}

const initialState: PostStateType = {
    photos: [],
    description: '',
    postId: null
}

export const postSlice = createSlice<any, any>({
    name: 'post',
    initialState,
    reducers: {
        setPhotoToPost: (state, action: PayloadAction<{ photo: string }>) => {
            state.photos = action.payload.photo
        },
        setPostId: (state, action: PayloadAction<{ postId: number }>) => {
            state.postId = action.payload.postId
        }
    }
})

export const { setPhotoToPost, setPostId } = postSlice.actions
export const postReducer = postSlice.reducer
