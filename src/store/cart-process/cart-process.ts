import {createSlice} from '@reduxjs/toolkit';
import {CartProcess} from '../../types/store-types';
import {NameSpace} from '../../const';


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
  },
});

export const {getOrderList, setOrderList} = cartProcess.actions;
