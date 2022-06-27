import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../history-router';
import Search from './search';
import {makeMockGuitars} from '../../../../mock/mock';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockGuitars = makeMockGuitars();

const store = mockStore({
  CART: {
    orderList: [],
    coupon: '',
  },
});


describe('Component: Search', () => {
  it('Компонент отрисовывается корректно', async () => {
    mockAxios.get.mockResolvedValue({data: mockGuitars});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Search />
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Начать поиск')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('search'), 'testsearch');

    expect(screen.getByDisplayValue('testsearch')).toBeInTheDocument();
  });
});

