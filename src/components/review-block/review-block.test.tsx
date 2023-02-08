import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import HistoryRouter from '../../components/history-router/history-router';
import ReviewBlock from './review-block';
import { makeFakeCamera, makeFakeReviews } from '../../utils/mocks';

const reviews = makeFakeReviews();
const camera = makeFakeCamera();

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewBlock reviews={reviews} camera={camera} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });
});
