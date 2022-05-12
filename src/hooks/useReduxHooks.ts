import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//Export a hook that can be reused to resolve types
//https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
