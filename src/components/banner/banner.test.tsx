import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>,
    );

    expect(
      screen.getByText('Произошла ошибка при загрузке баннера'),
    ).toBeInTheDocument();
  });
});
