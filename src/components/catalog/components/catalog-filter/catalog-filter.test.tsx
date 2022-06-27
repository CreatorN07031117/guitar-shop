import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../history-router';
import CatalogFilter from './catalog-filter';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  CATALOG: {
    sort: {
      sortType: 'price',
      orderMethod:'desc',
    },
    filters: {
      priceGte: 0,
      priceLte: 0,
      acoustic: true,
      electric: false,
      ukulele: false,
      fourStrings: false,
      sixStrings: false,
      sevenStrings: false,
      twelveStrings: false,
    },
    priceMax: 20000,
    priceMin: 1000,
  },
});


describe('Component: CatalogFilter', () => {

  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogFilter />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Максимальная цена')).toBeInTheDocument();
    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
    expect(screen.getByText('Количество струн')).toBeInTheDocument();
  });
});
