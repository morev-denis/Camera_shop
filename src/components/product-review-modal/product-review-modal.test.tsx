import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import ProductReviewModal from './product-review-modal';

const camera = makeFakeCamera();

describe('Component: ProductReviewModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductReviewModal
            camera={camera}
            isReviewModalOpen
            setReviewModalOpen={() => true}
            setReviewSuccessModalOpen={() => true}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
