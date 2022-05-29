import {render, screen} from '@testing-library/react';
import CatalogSort from './catalog-sort';


describe('Component: CatalogSort', () => {
  it('shoul render correctly', () => {
    render(
      <CatalogSort />,
    );

    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});