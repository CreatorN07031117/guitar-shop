import {render, screen} from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it('Компонент отрисовывается корректно', () => {
    render(
      <CatalogFilter />,
    );

    expect(screen.getByText('Максимальная цена')).toBeInTheDocument();
    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
    expect(screen.getByText('Количество струн')).toBeInTheDocument();
  });
});
