import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../history-router';
import Pagination from './pagination';


const mockStore = configureMockStore();
const history = createMemoryHistory();


describe('Component: Pagination', () => {
  it('Компонент отрисовывается корректно', () => {

    const store = mockStore({
      CATALOG: {
        isDataLoaded: true,
        currentPage: 3,
        pages: 5,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
  });
});

