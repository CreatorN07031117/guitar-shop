import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {catalogProcess} from './catalog-process/catalog-process';
import {cartProcess} from './cart-process/cart-process';
import {productProcess} from './product-process/product-process';


export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess.reducer,
  [NameSpace.Cart]: cartProcess.reducer,
  [NameSpace.Product]: productProcess.reducer,
});
