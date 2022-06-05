import {Link, useParams} from 'react-router-dom';
import {getCurrantPage} from '../../../../store/catalog-process/catalog-process';
import {useAppSelector} from '../../../../hooks/use-app-selector';
import {useAppDispatch} from '../../../../hooks/use-app-dispatch';
import style from './pagination.module.css';
import '../../../app/app.module.css';


function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();

  if(params.id){
    dispatch(getCurrantPage(Number(params.id)));
  }

  const {pages, currentPage} = useAppSelector(({CATALOG}) => CATALOG);

  const pageNumbers = [];

  for(let i = 0; i < pages; i = i + 1){
    pageNumbers.push(i+1);
  }

  const handleClick = (item: number) => {
    dispatch(getCurrantPage(item));
  };

  return (
    <div className={style.pagination}>
      <ul className={style.paginationList}>
        {currentPage > 1 &&
        <li className={style.paginationPrev} id="prev">
          <Link to={`/${currentPage -1}`} className={style.paginationLink}>Назад</Link>
        </li>}
        {pageNumbers.map((item) => (
          <li
            className={item === currentPage? style.paginationPageActive : style.paginationPage }
            key={item}
            onClick = {(evt) => {
              evt.preventDefault();
              handleClick(item);
            }}
          >
            <Link to={`/${item}`} className={style.paginationLink}>{item}</Link>
          </li>
        ),
        )}
        {currentPage < pages &&
        <li className={style.paginationNext} id="next">
          <Link to={`/${currentPage +1}`} className={style.paginationLink}>Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
