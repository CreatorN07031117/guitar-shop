import { store } from '../store/store';
import { Guitars, Guitar, Comments } from './data-types';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogProcess = {
  guitars: Guitars;
  isDataLoaded: boolean,
  currentPage: number,
  pages: number,
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

