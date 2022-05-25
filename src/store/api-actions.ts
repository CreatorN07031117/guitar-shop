import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/store-types';
import {APIRoute} from '../const';
import {Guitar, Guitars, Comments, NewComment} from '../types/data-types';
import {loadGuitars} from './catalog-process/catalog-process';
import {loadComments, loadGuitar} from './product-process/product-process';
import {redirectToRoute} from './actions';
import {errorHandle} from '../services/error-handle';


export const fetchGuitarsActions =
createAsyncThunk <void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?_embed=comments`);
      dispatch(loadGuitars(data));
    } catch (error) {
      dispatch(redirectToRoute('/*'));
    }
  },
);

export const fetchGuitarActions =
createAsyncThunk <void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitar',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitar>(`${APIRoute.Guitar}${id}`);
      dispatch(loadGuitar(data));
    } catch (error) {
      dispatch(redirectToRoute('/*'));
    }
  },
);

export const fetchCommentsActions =
createAsyncThunk <void, string, {
  disadvantage: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Guitar}${id}${APIRoute.Comments}`);
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const AddCommentAction =
  createAsyncThunk<void, NewComment, {
  disadvantage: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}, {dispatch, extra: api}) => {
    try {await api.post(`${APIRoute.Comments}${guitarId}$`, {guitarId, userName, advantage, disadvantage, comment, rating});
      dispatch(redirectToRoute(`${APIRoute.Guitar}${guitarId}${APIRoute.Comments}`));
    } catch (error) {
      errorHandle(error);
    }
  },
);
