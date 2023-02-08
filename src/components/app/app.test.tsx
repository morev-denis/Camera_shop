import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import App from './app';
import HistoryRouter from '../history-router/history-router';
import { store } from '../../utils/mocks';

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Catalog when user navigate to "/"', () => {
    history.push('/');

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render Camera when user navigate to "/cameras/id"', () => {
    history.push('/cameras/2');

    render(fakeApp);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
