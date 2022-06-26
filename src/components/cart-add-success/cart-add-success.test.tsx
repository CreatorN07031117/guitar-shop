import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router';
import CartAddSuccess from './cart-add-success';


const history = createMemoryHistory();


describe('Component: CartAddSuccess', () => {
  it('Компонент отрисовывается корректно', async () => {

    render(
      <HistoryRouter history={history}>
        <CartAddSuccess onAddSuccess={jest.fn()} />
      </HistoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('continue')).toHaveFocus());
    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
