import { createSlice } from '@reduxjs/toolkit';
import { ProductProcess } from '../../types/store-types';
import { Guitar, Comments } from '../../types/data-types';
import { NameSpace } from '../../const';


const initialState: ProductProcess = {
  guitar: {} as Guitar,
  isDataLoaded: false,
  comments: [] as Comments,
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    getGuitar: (state) => {
      ({guitar: state.guitar} = state);
    },
    loadGuitar: (state, action) => {
      state.guitar = action.payload;
    },
    getComments: (state) => {
      ({comments: state.comments} = state);
    },
    loadComments: (state, action) =>{
      state.comments = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { getGuitar, loadGuitar, getComments, loadComments } = productProcess.actions;
