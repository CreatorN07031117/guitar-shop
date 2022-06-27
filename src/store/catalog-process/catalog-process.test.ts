import {catalogProcess} from './catalog-process';
import {getGuitars, loadGuitars, getCurrantPage, getPages, setPages, loadSort, loadFilters, getFilters, loadPriceMax, loadPriceMin} from './catalog-process';
import {Guitars} from '../../types/data-types';
import {makeMockGuitars} from '../../mock/mock';


const mockGuitars = makeMockGuitars();
const initialState = {
  guitars: [] as Guitars,
  isDataLoaded: false,
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
  priceMax: 0,
  priceMin: 0,
};

describe('Reducer: catalogProcess', () => {
  it('Без параметров должен вернуть initial state', () => {
    expect(catalogProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен загрузить данные в guitars и изменить isDataLoaded на true', () => {
    expect(catalogProcess.reducer(initialState, loadGuitars(mockGuitars)))
      .toEqual({
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен обновить массив гитар', () => {
    const state = {
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
      priceMax: 0,
      priceMin: 0,
    };

    expect(catalogProcess.reducer(state, getGuitars()))
      .toEqual({
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен загрузить текущую страницу', () => {
    expect(catalogProcess.reducer(initialState, getCurrantPage(5)))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 5,
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен загрузить количество страниц', () => {
    expect(catalogProcess.reducer(initialState, setPages(5)))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 5,
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен обновить количество страниц', () => {
    const state = {
      guitars: [] as Guitars,
      isDataLoaded: false,
      currentPage: 1,
      pages: 5,
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
      priceMax: 0,
      priceMin: 0,
    };

    expect(catalogProcess.reducer(state, getPages()))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 5,
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен загрузить тип сортировки', () => {

    expect(catalogProcess.reducer(initialState, loadSort({sortType: 'price', orderMethod: 'asc'})))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 1,
        sort: {
          sortType: 'price',
          orderMethod: 'asc',
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
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен загрузить выбранные фильтры', () => {

    expect(catalogProcess.reducer(initialState, loadFilters({
      priceGte: 0,
      priceLte: 10000,
      acoustic: false,
      electric: false,
      ukulele: true,
      fourStrings: true,
      sixStrings: false,
      sevenStrings: false,
      twelveStrings: false,
    })))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 1,
        sort: {
          sortType: '',
          orderMethod: '',
        },
        filters: {
          priceGte: 0,
          priceLte: 10000,
          acoustic: false,
          electric: false,
          ukulele: true,
          fourStrings: true,
          sixStrings: false,
          sevenStrings: false,
          twelveStrings: false,
        },
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен обновить фильтры', () => {
    const state = {
      guitars: [] as Guitars,
      isDataLoaded: false,
      currentPage: 1,
      pages: 1,
      sort: {
        sortType: '',
        orderMethod:'',
      },
      filters: {
        priceGte: 0,
        priceLte: 10000,
        acoustic: false,
        electric: false,
        ukulele: true,
        fourStrings: true,
        sixStrings: false,
        sevenStrings: false,
        twelveStrings: false,
      },
      priceMax: 0,
      priceMin: 0,
    };

    expect(catalogProcess.reducer(state, getFilters()))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 1,
        sort: {
          sortType: '',
          orderMethod:'',
        },
        filters: {
          priceGte: 0,
          priceLte: 10000,
          acoustic: false,
          electric: false,
          ukulele: true,
          fourStrings: true,
          sixStrings: false,
          sevenStrings: false,
          twelveStrings: false,
        },
        priceMax: 0,
        priceMin: 0,
      });
  });

  it('Должен загрузить минимальную цену', () => {

    expect(catalogProcess.reducer(initialState, loadPriceMin(1000)))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 1,
        sort: {
          sortType: '',
          orderMethod: '',
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
        priceMax: 0,
        priceMin: 1000,
      });
  });

  it('Должен загрузить максимальную цену', () => {

    expect(catalogProcess.reducer(initialState, loadPriceMax(1000)))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 1,
        sort: {
          sortType: '',
          orderMethod: '',
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
        priceMin: 0,
      });
  });
});
