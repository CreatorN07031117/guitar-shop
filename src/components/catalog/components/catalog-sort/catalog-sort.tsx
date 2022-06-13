import {useEffect} from 'react';
import {useSearchParams, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../../../hooks/use-app-selector';
import {useAppDispatch} from '../../../../hooks/use-app-dispatch';
import {fetchSortGuitars} from '../../../../store/api-actions';
import {loadSort, loadOrderMethod} from '../../../../store/catalog-process/catalog-process';
import {Sort, OrderMethod} from '../../../../const';
import {getQueryStringFromObject, getObjectFromQueryString} from '../../../../utils';
import style from './catalog-sort.module.css';
import '../../../app/app.module.css';


function CatalogSort(): JSX.Element {

  const [sortParams , setSortParams] = useSearchParams();

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sortParamsUrl = getObjectFromQueryString(location.search);
    console.log(sortParamsUrl)

    dispatch(loadSort(sortParamsUrl.sort));
    dispatch(loadOrderMethod(sortParamsUrl.order));
  }, [dispatch, location.search]);


  const {sortType, orderMethod} = useAppSelector(({CATALOG}) => CATALOG);


  const handleSortClick = (sort: string, order: string) => {

    if(order  === undefined){
      order = OrderMethod.Asc;
    }

    if(sort === undefined){
      sort = Sort.Price;
    }

    dispatch(fetchSortGuitars({
      sort: sort,
      order: order,
    }));

    setSortParams({sort, order});
  };

  return (
    <div className={style.catalogSort}>
      <h2 className={style.catalogSortTitle}>Сортировать:</h2>
      <div className={style.catalogSortType}>
        <button
          className={sortType === Sort.Price? style.catalogSortTypeButtonActive : style.catalogSortTypeButton}
          aria-label="по цене"
          onClick={() => handleSortClick(Sort.Price, orderMethod)}
        >
          по цене
        </button>
        <button
          className={sortType === Sort.Rating? style.catalogSortTypeButtonActive : style.catalogSortTypeButton}
          aria-label="по популярности"
          onClick={() => handleSortClick(Sort.Rating, orderMethod)}
        >
          по популярности
        </button>
      </div>
      <div className={style.catalogSortOrder}>
        <button
          className={orderMethod === OrderMethod.Asc? `${style.orderButtonActive} ${style.catalogSortOrderButtonUp}` : style.catalogSortOrderButtonUp}
          aria-label="По возрастанию"
          onClick={() => handleSortClick(sortType, OrderMethod.Asc)}
        >
        </button>
        <button
          className={orderMethod === OrderMethod.Desc? `${style.orderButtonActive} ${style.catalogSortOrderButtonDown}` : style.catalogSortOrderButtonDown}
          aria-label="По убыванию"
          onClick={() => handleSortClick(sortType, OrderMethod.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
