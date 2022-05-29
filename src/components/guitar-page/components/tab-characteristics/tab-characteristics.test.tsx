import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../../history-router';
import TabCharacteristics from './tab-characteristics';
import {makeMockGuitar} from '../../../../mock/mock';


const history = createMemoryHistory();
history.push('/guitars/1');
const mockGuitar = makeMockGuitar();

describe('Component: TabCharacteristics', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <HistoryRouter history={history}>
        <TabCharacteristics
          vendorCode={mockGuitar.vendorCode}
          type={mockGuitar.type}
          stringCount={mockGuitar.stringCount}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('7 струнная')).toBeInTheDocument();
  });
});
