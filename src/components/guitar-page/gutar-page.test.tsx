import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router';
import {Provider} from 'react-redux';
import {makeMockGuitar, makeMockComments} from '../../mock/mock';
import GuitarPage from './gutar-page';


const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push('/guitars/1');
const mockGuitar = makeMockGuitar();
const mockComments = makeMockComments();

const store = mockStore({
  PRODUCT: {
    guitar: mockGuitar,
    isDataLoaded: true,
    comments: mockComments,
  },
  CART: {
    orderList: [],
    coupon: '',
  },
});

describe('Component: GuitarPage', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GuitarPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getAllByText('Название гитары')[0]).toBeInTheDocument();
  });
});
