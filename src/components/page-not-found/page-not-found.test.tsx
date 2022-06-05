import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router';
import PageNotFound from './page-not-found';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  CART: {
    orderList: [],
    coupon: '',
  },
});


describe('Component: NotFoundPage', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PageNotFound />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
