import {createSlice} from '@reduxjs/toolkit';
import {CatalogProcess} from '../../types/store-types';
import {Guitars} from '../../types/data-types';
import {NameSpace} from '../../const';


const initialState: CatalogProcess = {
  guitars: [] as Guitars,
  isDataLoaded: false,
  currentPage: 1,
  pages: 1,
  sort: {
    isSorted: false,
    sortType: '',
    orderMethod:'',
  },
  filters: {
    isFiltered: false,
    priceGte: 0,
    priceLte: 0,
    acoustic: false,
    electric: false,
    ukulele: false,
    fourStrings: false,
    sixStrings: false,
    sevenStrings: false,
    twelveStrings: false,
  },
  priceMax: 0,
  priceMin: 0,
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
      state.sort = action.payload;
      state.isDataLoaded = false;
    },
    loadFilters: (state, action) => {
      state.filters = action.payload;
      state.isDataLoaded = false;
    },
    getFilters: (state) => {
      ({pages: state.pages} = state);
    },
    loadPriceMax: (state, action) => {
      state.priceMax = action.payload;
    },
    loadPriceMin: (state, action) => {
      state.priceMin = action.payload;
    },
  },
});

export const {getGuitars, loadGuitars, getCurrantPage, getPages, setPages, loadSort, loadFilters, getFilters, loadPriceMax, loadPriceMin} = catalogProcess.actions;
