import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import {loadGuitars, loadPriceMax, loadPriceMin} from './catalog-process/catalog-process';
import {loadComments, loadGuitar} from './product-process/product-process';
import {redirectToRoute} from './actions';
import {errorHandle} from '../services/error-handle';
import {pushSereverResponse, sortByPrice} from '../utils';
import {APIRoute} from '../const';
import {AppDispatch, State} from '../types/store-types';
import {Guitar, Guitars, Comments, NewComment, NewOrder, Coupon} from '../types/data-types';
import {changeOrderList, skipCoupon, setCoupon, getCoupon} from './cart-process/cart-process';


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
      const minPrice = data.slice().sort((a,b) => sortByPrice(b,a));
      const maxPrice = data.slice().sort((a,b) => sortByPrice(a,b));
      dispatch(loadPriceMax(maxPrice[0].price));
      dispatch(loadPriceMin(minPrice[0].price));
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
        if(response.status === 201){toast.success('?????????? ?????????????? ??????????????????');}
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
          const minPrice = response.data.slice().sort((a,b) => sortByPrice(b,a));
          const maxPrice = response.data.slice().sort((a,b) => sortByPrice(a,b));
          dispatch(loadPriceMax(maxPrice[0].price));
          dispatch(loadPriceMin(minPrice[0].price));
        });
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postNewOrder =
createAsyncThunk<void, NewOrder, {
  disadvantage: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postNewOrder',
  async ({guitarsIds, coupon}, {dispatch, extra: api}) => {
    try {await api.post(`${APIRoute.Order}`, {guitarsIds, coupon})
      .then((response) => {
        if(response.status === 201){
          toast.success('?????????? ??????????????????');
          dispatch(changeOrderList([]));
          dispatch(skipCoupon({
            isValid: null,
            persent: 0,
          }));
        }
      });
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postCoupon =
createAsyncThunk<void, Coupon, {
  disadvantage: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setCoupon',
  async ({coupon}, {dispatch, extra: api}) => {
    try {await api.post(`${APIRoute.Coupon}`, {coupon})
      .then((response) => {
        dispatch(setCoupon({
          isValid: true,
          persent: response.data,
        }));

        dispatch(getCoupon());
      });
    } catch (error) {
      dispatch(setCoupon({
        isValid: false,
        persent: 0,
      }));
      dispatch(getCoupon());
      errorHandle(error);
    }
  },
);
