import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

type Props = {
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  setPage: (page: number) => void;
};

const Pagination = ({ totalPages, nextPage, prevPage, page, setPage }: Props) => {
  const params = useParams();

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {page !== 1 && (
          <li className="pagination__item" onClick={prevPage}>
            <Link
              to={`/catalog/page_${Number(params.pageNumber) - 1}`}
              className="pagination__link pagination__link--text"
            >
              Назад
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (element, i) => (
          <li key={i} className="pagination__item">
            <Link
              to={`/catalog/page_${i + 1}`}
              className={
                page === i + 1 ? 'pagination__link pagination__link--active' : 'pagination__link'
              }
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Link>
          </li>
        ))}

        {page !== totalPages && (
          <li className="pagination__item" onClick={nextPage}>
            <Link
              to={`/catalog/page_${Number(params.pageNumber) + 1}`}
              className="pagination__link pagination__link--text"
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
