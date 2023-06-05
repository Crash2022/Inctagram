import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { appReducer } from '@/store/slices/appSlice'
import { authReducer } from '@/store/slices/authSlice'
import { serviceAuthAPI } from '@/services/AuthService'
import { userProfileAPI } from '@/services/UserProfileService'
import { postReducer } from '@/store/slices/postSlice'
import { userPostsAPI } from '@/services/UserPostsService'

const combinedReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    post: postReducer,
    [serviceAuthAPI.reducerPath]: serviceAuthAPI.reducer,
    [userProfileAPI.reducerPath]: userProfileAPI.reducer,
    [userPostsAPI.reducerPath]: userPostsAPI.reducer
})

const reducer: typeof combinedReducer = (state, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload }
        default:
            return combinedReducer(state, action)
    }
}

export const makeStore = () =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                serviceAuthAPI.middleware,
                userProfileAPI.middleware,
                userPostsAPI.middleware
            )
    })

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>

export interface AsyncThunkType<RV = unknown> {
    state: RootState
    dispatch: AppDispatch
    rejectValue?: RV
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
    extra?: { s: string; n: number }
}

export const wrapper = createWrapper(makeStore /* { debug: true } */)
