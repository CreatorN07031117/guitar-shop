import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import {makeMockComment} from '../../../../mock/mock';
import CommentItem from './comment-item';


const mockComment = makeMockComment();
const history = createMemoryHistory();


describe('Component: CommentItem', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <HistoryRouter history={history}>
        <CommentItem
          comment={mockComment}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('Имя комментаратора')).toBeInTheDocument();
    expect(screen.getByText('Текст комментария')).toBeInTheDocument();
  });
});
