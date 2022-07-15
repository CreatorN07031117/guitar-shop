import {cartProcess} from './cart-process';
import {getOrderList, setOrderList, skipCoupon, setCoupon, getCoupon} from './cart-process';
import {makeMockGuitar} from '../../mock/mock';


const initialState = {
  orderList: [],
  coupon: {
    isValid: null,
    persent: 0,
  },
};

const mockGuitar = makeMockGuitar();

describe('Reducer: cartProcess', () => {
  it('Без дополнительных параметров должно вернуть initial state', () => {
    expect(cartProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        orderList: [],
        coupon: {
          isValid: null,
          persent: 0,
        },
      });
  });

  it('Должен загрузить данные в свойство orderList', () => {
    expect(cartProcess.reducer(initialState, setOrderList({
      guitar: mockGuitar,
      count: 1,
    })))
      .toEqual({
        orderList: [{
          guitar: mockGuitar,
          count: 1,
        }],
        coupon: {
          isValid: null,
          persent: 0,
        },
      });
  });

  it('Должен обновить данные в заказе', () => {
    const state = {
      orderList: [{
        guitar: mockGuitar,
        count: 1,
      }],
      coupon: {
        isValid: null,
        persent: 0,
      },
    };

    expect(cartProcess.reducer(state, getOrderList()))
      .toEqual({
        orderList: [{
          guitar: mockGuitar,
          count: 1,
        }],
        coupon: {
          isValid: null,
          persent: 0,
        },
      });
  });

  it('Должен загрузить данные по купону', () => {

    expect(cartProcess.reducer(initialState, setCoupon({
      isValid: true,
      persent: 10,
    })))
      .toEqual({
        orderList: [],
        coupon: {
          isValid: true,
          persent: 10,
        },
      });
  });

  it('Должен обновить данные по купону', () => {
    const state = {
      orderList: [],
      coupon: {
        isValid: true,
        persent: 10,
      },
    };

    expect(cartProcess.reducer(state, getCoupon()))
      .toEqual({
        orderList: [],
        coupon: {
          isValid: true,
          persent: 10,
        },
      });
  });

  it('Должен убрать данные по купону', () => {

    expect(cartProcess.reducer(initialState, skipCoupon({
      isValid: null,
      persent: 0,
    })))
      .toEqual({
        orderList: [],
        coupon: {
          isValid: null,
          persent: 0,
        },
      });
  });
});
