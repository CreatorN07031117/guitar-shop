import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import SuccessCommentAddPopup from './success-comment-add-popup';


const history = createMemoryHistory();
history.push('/guitars/1');

describe('Component: SuccessCommentAddPopup', () => {
  it('Компонент отрисовывается корректно', async () => {
    render(
      <HistoryRouter history={history}>
        <SuccessCommentAddPopup
          onSuccessComment={jest.fn()}
        />
      </HistoryRouter>,
    );
    await waitFor(() => expect(screen.getByTestId('continue')).toHaveFocus());
    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
  });
});

