import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { makeFakeCameras } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import Cards from './cards';

const cameras = makeFakeCameras();

describe('Component: Cards', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cards cameras={cameras} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('catalog__cards')).toBeInTheDocument();
  });
});
