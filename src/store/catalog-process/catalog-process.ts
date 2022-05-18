import { createSlice } from '@reduxjs/toolkit';
import { CatalogProcess } from '../../types/store-types';
import { Guitars } from '../../types/data-types';
import { NameSpace } from '../../const';


const initialState: CatalogProcess = {
  guitars: [] as Guitars,
  isDataLoaded: false,
  currentPage: 1,
  pages: 1,
};

export const catalogProcess = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    getGuitars: (state) => {
      ({guitars: state.guitars} = state);
    },
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    getCurrantPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    getPages: (state) => {
      ({pages: state.pages} = state);
    },
  },
});

export const { getGuitars, loadGuitars, getCurrantPage, getPages, setPages } = catalogProcess.actions;
