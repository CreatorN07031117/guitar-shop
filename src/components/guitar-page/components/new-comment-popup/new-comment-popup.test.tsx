import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import NewCommentPopup from './new-comment-popup';
import {makeMockGuitar, makeMockComments} from '../../../../mock/mock';


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
});


describe('Component: NewCommentPopup', () => {
  it('Компонент отрисовывается корректно', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NewCommentPopup
            id={1}
            onNewComment={jest.fn()}
            onSuccessComment={jest.fn()}
            onAddComment={jest.fn()}
            guitarName='название гитары'
          />
        </HistoryRouter>
      </Provider>,
    );

    await waitFor(() => expect(screen.getByTestId('initial-focus-node')).toHaveFocus());
    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.getByText('название гитары')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('comment'), 'testcomment');
    userEvent.type(screen.getByTestId('name'), 'testname');
    userEvent.type(screen.getByTestId('adv'), 'testadvantage');
    userEvent.type(screen.getByTestId('disadv'), 'testdisadvantage');

    expect(screen.getByDisplayValue('testcomment')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testname')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testadvantage')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testdisadvantage')).toBeInTheDocument();
  });
});
