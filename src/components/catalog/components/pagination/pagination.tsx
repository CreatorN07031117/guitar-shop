import { Link } from 'react-router-dom';
import { getCurrantPage } from '../../../../store/catalog-process/catalog-process';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';


function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pages, currentPage } = useAppSelector(({CATALOG}) => CATALOG);

  const pageNumbers = [];

  for(let i=0; i < pages; i = i+1){
    pageNumbers.push(i+1);
  }

  const handleClick = (item: number) => {
    dispatch(getCurrantPage(item));
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {pageNumbers.map((item) => (
          <li className={`pagination__page ${item === currentPage && 'pagination__page--active'}`} key={item}
            onClick = {(evt) => {
              evt.preventDefault();
              handleClick(item);
            }}
          >
            <Link to={`/${item}`} className="link pagination__page-link">{item}</Link>
          </li>))}
        {currentPage < pages &&
        <li className="pagination__page pagination__page--next" id="next">
          <Link to={`/${currentPage +1}`} className="link pagination__page-link">Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
