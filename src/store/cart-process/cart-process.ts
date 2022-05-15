import { createSlice } from '@reduxjs/toolkit';
import { CartProcess } from '../../types/store-types';
import { NameSpace } from '../../const';


const initialState: CartProcess = {
  orderList: [],
  coupon: '',
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    getOrderList: (state) => {
      ({orderList: state.orderList} = state);
    },
    setOrderList: (state, action) => {
      state.orderList.push(action.payload as number);
    },
    getCoupon: (state) => {
      ({coupon: state.coupon} = state);
    },
    loadCoupon: (state, action) => {
      state.coupon = action.payload;
    },
  },
});

export const { getOrderList, setOrderList, getCoupon, loadCoupon } = cartProcess.actions;
