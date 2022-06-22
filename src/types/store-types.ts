import {store} from '../store/store';
import {Guitars, Guitar, Comments} from './data-types';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogProcess = {
  guitars: Guitars;
  isDataLoaded: boolean,
  currentPage: number,
  pages: number,
  sort: Sort,
  filters: Filter,
  priceMax: number,
  priceMin: number,
};

export type CartProcess = {
  orderList: number [];
  coupon: string;
};

export type ProductProcess = {
  guitar: Guitar;
  isDataLoaded: boolean,
  comments: Comments,
}

export type Filter = {
  isFiltered: boolean,
  priceGte: number,
  priceLte: number,
  acoustic: boolean,
  electric: boolean,
  ukulele: boolean,
  fourStrings: boolean,
  sixStrings: boolean,
  sevenStrings: boolean,
  twelveStrings: boolean,
}

export type Sort = {
  isSorted: boolean,
  sortType: string,
  orderMethod: string,
}

