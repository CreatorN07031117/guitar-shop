import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router';
import {Provider} from 'react-redux';
import {makeMockGuitar} from '../../mock/mock';
import Cart from './cart';


const mockGuitar = makeMockGuitar();

const mockOrderList = [{
  guitar: mockGuitar,
  count: 1,
}];

const mockCoupon = {
  isValid: null,
  persent: 0,
};

const history = createMemoryHistory();
history.push('/cart');
const mockStore = configureMockStore();

const store = mockStore({
  CART: {
    orderList: mockOrderList,
    coupon: mockCoupon,
  },
});

describe('Component: Cart', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cart />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText('Корзина')[0]).toBeInTheDocument();
  });
});
