import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import BasketRemoveItemModal from './basket-remove-item-modal';

const camera = makeFakeCamera();

describe('Component: BasketRemoveItemModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketRemoveItemModal
            camera={camera}
            item={{ id: 1, count: 4 }}
            isBasketRemoveItemModalOpen
            setBasketRemoveItemModalOpen={() => true}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
