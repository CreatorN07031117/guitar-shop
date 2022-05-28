import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import SuccessCommentAddPopup from './success-comment-add-popup';


const history = createMemoryHistory();
history.push('/guitars/1');

describe('Component: SuccessCommentAddPopup', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <HistoryRouter history={history}>
        <SuccessCommentAddPopup
          onSuccessComment={jest.fn()}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
  });
});

