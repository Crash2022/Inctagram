import { RootState } from '@/store/store';

export const selectorIsLoading = (state: RootState) => state.app.isLoading;
