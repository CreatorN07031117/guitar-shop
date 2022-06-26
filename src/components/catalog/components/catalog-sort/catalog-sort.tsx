import {useEffect} from 'react';
import {useSearchParams, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../../../hooks/use-app-selector';
import {useAppDispatch} from '../../../../hooks/use-app-dispatch';
import {loadSort} from '../../../../store/catalog-process/catalog-process';
import {SortType, OrderMethod} from '../../../../const';
import {getFetchString, getArrayFromQueryString} from '../../../../utils';
import style from './catalog-sort.module.css';
import '../../../app/app.module.css';


function CatalogSort(): JSX.Element {

  const [, setSortParams] = useSearchParams();

  const location = useLocation();
  const dispatch = useAppDispatch();

  const {filters, sort} = useAppSelector(({CATALOG}) => CATALOG);

  useEffect(() => {
    const paramsUrl = getArrayFromQueryString(location.search);
    dispatch(loadSort({...sort, sortType: paramsUrl.sortType, orderMethod: paramsUrl.orderMethod}));
  }, [location.search, dispatch]);


  const handleSortClick = (type: string, order: string) => {

    if(order === ''){
      order = OrderMethod.Asc;
    }

    if(type === ''){
      type = SortType.Price;
    }

    dispatch(loadSort({...sort, sortType: type, orderMethod: order}));
    const response = getFetchString(filters, {...sort, sortType: type, orderMethod: order});
    setSortParams(response);
  };

  return (
    <div className={style.catalogSort}>
      <h2 className={style.catalogSortTitle}>Сортировать:</h2>
      <div className={style.catalogSortType}>
        <button
          className={sort.sortType === SortType.Price? style.catalogSortTypeButtonActive : style.catalogSortTypeButton}
          aria-label="по цене"
          onClick={() => handleSortClick(SortType.Price, sort.orderMethod)}
        >
          по цене
        </button>
        <button
          className={sort.sortType === SortType.Rating? style.catalogSortTypeButtonActive : style.catalogSortTypeButton}
          aria-label="по популярности"
          onClick={() => handleSortClick(SortType.Rating, sort.orderMethod)}
        >
          по популярности
        </button>
      </div>
      <div className={style.catalogSortOrder}>
        <button
          className={sort.orderMethod === OrderMethod.Asc? `${style.orderButtonActive} ${style.catalogSortOrderButtonUp}` : style.catalogSortOrderButtonUp}
          aria-label="По возрастанию"
          onClick={() => handleSortClick(sort.sortType, OrderMethod.Asc)}
        >
        </button>
        <button
          className={sort.orderMethod === OrderMethod.Desc? `${style.orderButtonActive} ${style.catalogSortOrderButtonDown}` : style.catalogSortOrderButtonDown}
          aria-label="По убыванию"
          onClick={() => handleSortClick(sort.sortType, OrderMethod.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
