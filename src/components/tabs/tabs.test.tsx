import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Tabs from './tabs';

const camera = makeFakeCamera();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs camera={camera} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(camera.description)).toBeInTheDocument();
  });
});
