import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/store-types';
import { APIRoute } from '../const';
import { Guitar, Guitars } from '../types/data-types';
import { loadGuitars } from './catalog-process/catalog-process';
import { redirectToRoute } from './actions';
import { errorHandle } from '../services/error-handle';


export const fetchGuitarsActions =
createAsyncThunk <void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
