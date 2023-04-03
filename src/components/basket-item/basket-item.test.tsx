import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import BasketItem from './basket-item';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore([]);

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      cameras: [
        {
          id: 1,
          name: 'Ретрокамера Dus Auge lV',
          vendorCode: 'DA4IU67AD5',
          type: 'Коллекционная',
          category: 'Видеокамера',
          description:
            'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
          previewImg: 'img/content/das-auge.jpg',
          level: 'Любительский',
          rating: 4,
          price: 73450,
          previewImg2x: 'img/content/das-auge@2x.jpg',
          previewImgWebp: 'img/content/das-auge.webp',
          previewImgWebp2x: 'img/content/das-auge@2x.webp',
          reviewCount: 11,
        },
      ],
    });

    const item = { id: 1, count: 2 };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem item={item} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('basket-item')).toBeInTheDocument();
  });
});
