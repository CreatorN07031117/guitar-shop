import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../history-router';
import CatalogSort from './catalog-sort';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  CATALOG: {
    sort: {
      sortType: '',
      orderMethod:'',
    },
  },
});

describe('Component: CatalogSort', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
