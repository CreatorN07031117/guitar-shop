import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router';
import App from './app';
import {makeMockGuitar, makeMockGuitars, makeMockComments} from '../../mock/mock';


const mockStore = configureMockStore();
const mockGuitar = makeMockGuitar();
const mockGuitars = makeMockGuitars();
const mockComments = makeMockComments();

const history = createMemoryHistory();

const store = mockStore({
  CATALOG: {
    guitars: mockGuitars,
    isDataLoaded: true,
    currentPage: 1,
    pages: 1,
    sort: {
      sortType: '',
      orderMethod:'',
    },
    filters: {
      priceGte: 0,
      priceLte: 0,
      acoustic: false,
      electric: false,
      ukulele: false,
      fourStrings: false,
      sixStrings: false,
      sevenStrings: false,
      twelveStrings: false,
    },
    priceMax: 1000,
    priceMin: 20000,
  },
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

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  it('Должен отрисовать "Catalog" когда пользователь переходит на "/"', () => {
    history.push('/');

    render(fakeApp);

    expect(screen.getAllByText('Каталог')[0]).toBeInTheDocument();
    expect(screen.getByText('Название гитары')).toBeInTheDocument();
  });

  it('Должен отрисовать "Guitar page" когда пользователь переходит на "/guitar/id"', () => {
    history.push('/guitars/1');

    render(fakeApp);

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
  });

  it ('Должен отрисовать "Not Found Page"когда пользователь переходит на несуществующую страницу', () => {
    history.push('/guitar/non');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('Должен отрисовать "Catalog" когда пользователь переходит на  "/catalog"', () => {
    history.push('/catalog');

    render(fakeApp);

    expect(screen.getAllByText('Каталог')[0]).toBeInTheDocument();
    expect(screen.getByText('Название гитары')).toBeInTheDocument();
  });
});
