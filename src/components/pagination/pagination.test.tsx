import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import Pagination from './pagination';


describe('Component: CatalogAddItemModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination
            totalPages={10}
            nextPage={() => true}
            prevPage={() => true}
            page={1}
            setPage={() => 2}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
