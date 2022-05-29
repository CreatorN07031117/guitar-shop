import {catalogProcess} from './catalog-process';
import {getGuitars, loadGuitars, getCurrantPage, getPages, setPages} from './catalog-process';
import {Guitars} from '../../types/data-types';
import {makeMockGuitars} from '../../mock/mock';


const mockGuitars = makeMockGuitars();
const initialState = {
  guitars: [] as Guitars,
  isDataLoaded: false,
  currentPage: 1,
  pages: 1,
};

describe('Reducer: catalogProcess', () => {
  it('Без параметров должен вернуть initial state', () => {
    expect(catalogProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 1,
      });
  });

  it('Должен загрузить данные в guitars и изменить isDataLoaded на true', () => {
    expect(catalogProcess.reducer(initialState, loadGuitars(mockGuitars)))
      .toEqual({
        guitars: mockGuitars,
        isDataLoaded: true,
        currentPage: 1,
        pages: 1,
      });
  });

  it('Должен обновить массив гитар', () => {
    const state = {
      guitars: mockGuitars,
      isDataLoaded: true,
      currentPage: 1,
      pages: 1,
    };

    expect(catalogProcess.reducer(state, getGuitars()))
      .toEqual({
        guitars: mockGuitars,
        isDataLoaded: true,
        currentPage: 1,
        pages: 1,
      });
  });

  it('Должен загрузить текущую страницу', () => {
    expect(catalogProcess.reducer(initialState, getCurrantPage(5)))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 5,
        pages: 1,
      });
  });

  it('Должен загрузить количество страниц', () => {
    expect(catalogProcess.reducer(initialState, setPages(5)))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 5,
      });
  });

  it('Должен обновить количество страниц', () => {
    const state = {
      guitars: [] as Guitars,
      isDataLoaded: false,
      currentPage: 1,
      pages: 5,
    };

    expect(catalogProcess.reducer(state, getPages()))
      .toEqual({
        guitars: [] as Guitars,
        isDataLoaded: false,
        currentPage: 1,
        pages: 5,
      });
  });
});
