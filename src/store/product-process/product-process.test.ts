import {productProcess} from './product-process';
import {getGuitar, loadGuitar, getComments, loadComments} from './product-process';
import {Guitar, Comments} from '../../types/data-types';
import {makeMockComments, makeMockGuitar} from '../../mock/mock';


const mockGuitar = makeMockGuitar();
const mockComments = makeMockComments();
const initialState = {
  guitar: {} as Guitar,
  isDataLoaded: false,
  comments: [] as Comments,
};

describe('Reducer: productProcess', () => {
  it('Без дополнительных параметров должно вернуть initial state', () => {
    expect(productProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitar: {} as Guitar,
        isDataLoaded: false,
        comments: [] as Comments,
      });
  });

  it('Должен загрузить данные в свойстве guitar', () => {
    expect(productProcess.reducer(initialState, loadGuitar(mockGuitar)))
      .toEqual({
        guitar: mockGuitar,
        isDataLoaded: false,
        comments: [] as Comments,
      });
  });

  it('Должен загрузить массив комментариев в свойстве comments и изменить isDataLoaded на true', () => {
    expect(productProcess.reducer(initialState, loadComments(mockComments)))
      .toEqual({
        guitar: {} as Guitar,
        isDataLoaded: true,
        comments: mockComments,
      });
  });

  it('Должен обновить данные гитары', () => {
    const state = {
      guitar: mockGuitar,
      isDataLoaded: false,
      comments: [] as Comments,
    };

    expect(productProcess.reducer(state, getGuitar()))
      .toEqual({
        guitar: mockGuitar,
        isDataLoaded: false,
        comments: [] as Comments,
      });
  });

  it('Должен обновить массив комментариев', () => {
    const state = {
      guitar: {} as Guitar,
      isDataLoaded: true,
      comments: mockComments,
    };

    expect(productProcess.reducer(state, getComments()))
      .toEqual({
        guitar: {} as Guitar,
        isDataLoaded: true,
        comments: mockComments,
      });
  });
});
