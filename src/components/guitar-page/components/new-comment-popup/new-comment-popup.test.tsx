import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
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
  it('Компонент отрисовывается корректно', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NewCommentPopup
            id={1}
            onNewComment={jest.fn()}
            onSuccessComment={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.getByText('Поставьте оценку')).toBeInTheDocument();

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
