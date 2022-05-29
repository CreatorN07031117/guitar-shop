import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router';
import {Provider} from 'react-redux';
import {makeMockGuitars} from '../../mock/mock';
import Catalog from './catalog';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeMockGuitars();
const store = mockStore({
  CATALOG: {
    guitars: mockGuitars,
    isDataLoaded: true,
    currentPage: 1,
    pages: 1,
  },
  CART: {
    orderList: [],
    coupon: '',
  },
});

describe('Component: Catalog', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText('Каталог')[0]).toBeInTheDocument();
    expect(screen.getByText('Название гитары')).toBeInTheDocument();
  });
});
