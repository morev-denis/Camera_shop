import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import CatalogAddItemModal from './catalog-add-item-modal';

const camera = makeFakeCamera();

describe('Component: CatalogAddItemModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogAddItemModal
            camera={camera}
            isCatalogAddItemModalOpen
            setCatalogAddItemModalOpen={() => true}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
