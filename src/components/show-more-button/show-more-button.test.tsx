import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ShowMoreButton />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });
});
