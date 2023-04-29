import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from '@/redux/slices/auth/authSlice';
import appReducer from '@/redux/slices/app/appSlice';
import moderationSlice from '@/redux/slices/moderation/moderationSlice';
import s_adminSlice from '@/redux/slices/s_admin/s_adminSlice';
import adminSlice from '@/redux/slices/admin/adminSlice';

const combinedReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    s_admin: s_adminSlice,
    admin: adminSlice,
    moderation: moderationSlice
});

const reducer: typeof combinedReducer = (state, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };

        default:
            return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;

export type AsyncThunkType<RV = unknown> = {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue?: RV;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
    extra?: { s: string; n: number };
};

export const wrapper = createWrapper(makeStore /*{ debug: true }*/);

// export default {}
