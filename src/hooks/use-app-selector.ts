import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {State} from '../types/store-types';


export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
