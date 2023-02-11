import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import Catalog from './catalog';


describe('Component: Catalog', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(
      screen.getByText('Произошла ошибка при загрузке данных камер'),
    ).toBeInTheDocument();
  });
});
