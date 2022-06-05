import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router';
import Header from './header';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  CART: {
    orderList: [],
    coupon: '',
  },
});


describe('Component: Header', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('О компании')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Где купить?')).toBeInTheDocument();
  });
});
