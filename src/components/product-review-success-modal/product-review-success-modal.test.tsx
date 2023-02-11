import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import ProductReviewSuccessModal from './product-review-success-modal';

describe('Component: ProductReviewModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductReviewSuccessModal
            isReviewSuccessModalOpen
            setReviewSuccessModalOpen={() => true}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
