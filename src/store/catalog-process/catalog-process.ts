import {createSlice} from '@reduxjs/toolkit';
import {CatalogProcess} from '../../types/store-types';
import {Guitars} from '../../types/data-types';
import {NameSpace} from '../../const';


const initialState: CatalogProcess = {
  guitars: [] as Guitars,
  isDataLoaded: false,
  currentPage: 1,
  pages: 1,
  sortType: '',
  orderMethod: '',
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
    loadSort: (state, action) => {
      state.sortType = action.payload;
    },
    loadOrderMethod: (state, action) => {
      state.orderMethod = action.payload;
    },
  },
});

export const {getGuitars, loadGuitars, getCurrantPage, getPages, setPages, loadSort, loadOrderMethod} = catalogProcess.actions;
