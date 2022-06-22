import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import {loadGuitars, loadPriceMax, loadPriceMin} from './catalog-process/catalog-process';
import {loadComments, loadGuitar} from './product-process/product-process';
import {redirectToRoute} from './actions';
import {errorHandle} from '../services/error-handle';
import {pushSereverResponse} from '../utils';
import {APIRoute} from '../const';
import {AppDispatch, State} from '../types/store-types';
import {Guitar, Guitars, Comments, NewComment} from '../types/data-types';


export const fetchGuitarsActions =
createAsyncThunk <void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}??_embed=comments`);
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
    try {await api.post(`${APIRoute.Comments}`, {guitarId, userName, advantage, disadvantage, comment, rating})
      .then((response) => {
        if(response.status === 201){toast.success('Отзыв успешно отправлен');}
      });
    } catch (error) {
      errorHandle(error);
    }
  },
);


export const fetchFilterGuitars =
createAsyncThunk<void, string, {
  disadvantage: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilterGuitars',
  async (filterParams, {dispatch, extra: api}) => {
    try {
      await api.get<Guitars>(`${APIRoute.Guitars}${filterParams}&_embed=comments`)
        .then((response) => {
          pushSereverResponse(response.status);
          dispatch(loadGuitars(response.data));
        });
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPriceMax =
  createAsyncThunk<void, undefined, {
    disadvantage: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchPriceMax',
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?_sort=price&_order=desc&_limit=1`);
        dispatch(loadPriceMax(data[0].price));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const fetchPriceMin =
  createAsyncThunk<void, undefined, {
    disadvantage: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchPriceMin',
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?_sort=price&_order=asc&_limit=1`);
        dispatch(loadPriceMin(data[0].price));
      } catch (error) {
        errorHandle(error);
      }
    },
  );
