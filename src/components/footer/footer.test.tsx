import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router';
import Footer from './footer';


const history = createMemoryHistory();


describe('Component: Footer', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByText('Режим работы:')).toBeInTheDocument();
    expect(screen.getByText('Блог')).toBeInTheDocument();
    expect(screen.getByAltText('Логотип')).toBeInTheDocument();
  });
});
