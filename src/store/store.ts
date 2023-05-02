import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { appReducer } from '@/store/slices/app/appSlice';
import { authReducer } from '@/store/slices/auth/authSlice';

const combinedReducer = combineReducers({
    app: appReducer,
    auth: authReducer
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
