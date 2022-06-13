import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../const';
import {State} from '../types/store-types';
import {makeMockGuitar, makeMockGuitars, makeMockComments} from '../mock/mock';
import {fetchGuitarsActions, fetchGuitarActions, fetchCommentsActions} from './api-actions';
import {loadGuitar, loadComments } from './product-process/product-process';
import {loadGuitars} from './catalog-process/catalog-process';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('должно вызвать loadGuitars по запросу GET /guitars', async () => {
    const mockGuitars = makeMockGuitars();

    mockAPI
      .onGet(`${APIRoute.Guitars}?_embed=comments`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsActions());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitars.toString());
  });

  it('должно вызвать loadGuitar по запросу GET /guitar', async () => {
    const mockGuitar = makeMockGuitar();
    const id = 1;

    mockAPI
      .onGet(`${APIRoute.Guitar}${id}`)
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitarActions(`${id}`));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitar.toString());
  });

  it('должно вызвать loadComments по запросу GET /comments', async () => {
    const mockComments = makeMockComments();
    const id = 1;

    mockAPI
      .onGet(`${APIRoute.Guitar}${id}${APIRoute.Comments}`)
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsActions(`${id}`));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });
});



