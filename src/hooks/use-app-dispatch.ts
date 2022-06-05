import {useDispatch} from 'react-redux';
import type {AppDispatch } from '../types/store-types';


export const useAppDispatch = () => useDispatch<AppDispatch>();
