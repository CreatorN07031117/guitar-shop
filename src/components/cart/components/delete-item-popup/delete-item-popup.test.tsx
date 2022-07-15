import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import DeleteItemPopup from './delete-item-popup';
import {makeMockGuitar} from '../../../../mock/mock';

const history = createMemoryHistory();
const mockGuitar = makeMockGuitar();

describe('Component: DeleteItemPopup', () => {
  it('Компонент отрисовывается корректно', async () => {

    render(
      <HistoryRouter history={history}>
        <DeleteItemPopup
          guitar={mockGuitar}
          onGuitarId={jest.fn()}
          onDelete={jest.fn()}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
