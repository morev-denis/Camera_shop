import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import FormSearch from './form-search';

describe('Component: FormSearc', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
