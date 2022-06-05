import style from './catalog-sort.module.css';
import '../../../app/app.module.css';


function CatalogSort (): JSX.Element {
  return (
    <div className={style.catalogSort}>
      <h2 className={style.catalogSortTitle}>Сортировать:</h2>
      <div className={style.catalogSortType}>
        <button className={style.catalogSortTypeButton} aria-label="по цене">по цене</button>
        <button className={style.catalogSortTypeButton} aria-label="по популярности">по популярности</button>
      </div>
      <div className={style.catalogSortOrder}>
        <button className={style.catalogSortOrderButtonUp} aria-label="По возрастанию"></button>
        <button className={style.catalogSortOrderButtonDown} aria-label="По убыванию"></button>
      </div>
    </div>
  );
}

export default CatalogSort;
