import {createSlice} from '@reduxjs/toolkit';
import {Guitar} from '../../types/data-types';
import {CartProcess} from '../../types/store-types';
import {NameSpace} from '../../const';


const initialState: CartProcess = {
  orderList: [],
  coupon: {
    isValid: null,
    persent: 0,
  },
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    getOrderList: (state) => {
      ({orderList: state.orderList} = state);
    },
    setOrderList: (state, action) => {
      state.orderList.push(action.payload as {guitar: Guitar, count: number});
    },
    changeOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    skipCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    getCoupon: (state) => {
      ({coupon: state.coupon} = state);
    },
  },
});

export const {getOrderList, setOrderList, changeOrderList, skipCoupon, setCoupon, getCoupon} = cartProcess.actions;
