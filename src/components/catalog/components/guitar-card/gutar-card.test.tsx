import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../history-router';
import GuitarCard from './gutar-card';
import {makeMockGuitar} from '../../../../mock/mock';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitar = makeMockGuitar();

const store = mockStore({
  CART: {
    orderList: [],
    coupon: '',
  },
});


describe('Component: GuitarCard', () => {
  it('компонент отрисовывается корректно', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GuitarCard
            guitar={mockGuitar}
            onGuitarId={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText('Название гитары')[0]).toBeInTheDocument();
  });
});

