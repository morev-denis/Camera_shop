import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import CatalogPriceFilter from './catalog-price-filter';

describe('Component: CatalogPriceFilter', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPriceFilter />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('priceUp')).toBeInTheDocument();
  });
});
