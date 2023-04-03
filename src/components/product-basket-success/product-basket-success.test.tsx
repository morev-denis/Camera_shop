import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import ProductBasketSuccessModal from './product-basket-success';

describe('Component: ProductBasketSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductBasketSuccessModal
            isProductBasketSuccessModalOpen
            setProductBasketSuccessModalOpen={() => true}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
