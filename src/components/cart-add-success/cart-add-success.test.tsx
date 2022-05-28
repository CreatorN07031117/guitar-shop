import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router';
import CartAddSuccess from './cart-add-success';


const history = createMemoryHistory();

describe('Component: CartAddSuccess', () => {
  it('компонент отрисовывается корректно', () => {

    render(
      <HistoryRouter history={history}>
        <CartAddSuccess onAddSuccess={jest.fn()} />
      </HistoryRouter>,
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
