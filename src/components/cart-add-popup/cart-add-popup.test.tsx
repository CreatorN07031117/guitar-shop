import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router';
import './matchMedia.mock';
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



jest.mock('focus-trap-react', () => {
  const trap = {
    activate: () => trap,
    deactivate: () => trap,
    pause: () => jest.fn(),
    unpause: () => jest.fn(),
  };
  return () => trap;
});

describe('Component: CartAddPopup', () => {
  beforeEach(() => {
    require('focus-trap-react');
  });

  it('Компонент отрисовывается корректно', async () => {

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

    await waitFor(() => expect(screen.getByTestId('addtocart')).toHaveFocus());

    expect(screen.getByText('Название гитары')).toBeInTheDocument();
  });
});
