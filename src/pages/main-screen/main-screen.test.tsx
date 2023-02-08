import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import MainScreen from './main-screen';

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <MainScreen />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>,
    );

    expect(screen.getByText('Главная страница')).toBeInTheDocument();
  });
});
