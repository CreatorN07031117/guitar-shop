import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../history-router';
import CartItem from './cart-item';
import {makeMockGuitar} from '../../../../mock/mock';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitar = makeMockGuitar();

const store = mockStore({
  CART: {
    orderList: [{
      guitar: mockGuitar,
      count: 1,
    }],
    coupon: {
      isValid: null,
      persent: 0,
    },
  },
});

describe('Component: CartItem', () => {
  it('компонент отрисовывается корректно', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem
            guitar={mockGuitar}
            count={'1'}
            isChangeQuantity={jest.fn()}
            isDeleteItem={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText('Название гитары')[0]).toBeInTheDocument();
  });
});

