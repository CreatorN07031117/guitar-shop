import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router';
import CartAddPopup from './cart-add-popup';
import {makeMockGuitar} from '../../mock/mock';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitar = makeMockGuitar();

const store = mockStore({
  CART: {
    orderList: [],
    coupon: '',
  },
});

describe('Component: CartAddPopup', () => {
  it('Компонент отрисовывается корректно', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartAddPopup
            guitar={mockGuitar}
            onGuitarId={jest.fn()}
            onAddSuccess={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Название гитары')).toBeInTheDocument();
  });
});
