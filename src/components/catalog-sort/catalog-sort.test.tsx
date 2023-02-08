import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../history-router/history-router';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSort />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
  });
});
