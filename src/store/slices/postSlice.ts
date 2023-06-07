import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { action } from '@storybook/addon-actions'

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

console.log(initialState.postId)

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
