import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import TabCDescription from './tab-description';
import {makeMockGuitar} from '../../../../mock/mock';


const history = createMemoryHistory();
history.push('/guitars/1');
const mockGuitar = makeMockGuitar();


describe('Component: TabCDescription', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <HistoryRouter history={history}>
        <TabCDescription
          description={mockGuitar.description}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('Описание гитары')).toBeInTheDocument();
  });
});
