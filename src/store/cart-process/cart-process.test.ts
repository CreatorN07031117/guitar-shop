import {cartProcess} from './cart-process';
import {getOrderList, setOrderList} from './cart-process';


const initialState = {
  orderList: [],
  coupon: '',
};

describe('Reducer: cartProcess', () => {
  it('Без дополнительных параметров должно вернуть initial state', () => {
    expect(cartProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        orderList: [],
        coupon: '',
      });
  });

  it('Должен загрузить данные в свойство orderList', () => {
    expect(cartProcess.reducer(initialState, setOrderList(2)))
      .toEqual({
        orderList: [2],
        coupon: '',
      });
  });

  it('Должен обновить данные в заказе', () => {
    const state = {
      orderList: [2],
      coupon: '',
    };

    expect(cartProcess.reducer(state, getOrderList()))
      .toEqual({
        orderList: [2],
        coupon: '',
      });
  });
});
