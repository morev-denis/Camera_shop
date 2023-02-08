import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import SimilarCameras from './similar-cameras';
import { makeFakeCameras } from '../../utils/mocks';

const similarCameras = makeFakeCameras();

describe('Component: SimilarCameras', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarCameras similarCameras={similarCameras} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });
});
