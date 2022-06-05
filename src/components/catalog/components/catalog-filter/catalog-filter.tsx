import style from './catalog-filter.module.css';
import '../../../app/app.module.css';


function CatalogFilter(): JSX.Element {
  return (
    <form className={style.catalogFilter}>
      <h2 className={style.catalogFilterTitle}>Фильтр</h2>
      <fieldset className={style.catalogFilterBlock}>
        <legend className={style.catalogFlterBlockTitle}>Цена, ₽</legend>
        <div className={style.catalogFilterPriceRange}>
          <div className={style.formInput}>
            <label className={style.visuallyHidden}>Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className={style.formInput}>
            <label className={style.visuallyHidden}>Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
      <fieldset className={style.catalogFilterBlock}>
        <legend className={style.catalogFlterBlockTitle}>Тип гитар</legend>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="acoustic" name="acoustic" />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="electric" name="electric" />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="ukulele" name="ukulele" />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className={style.catalogFilterBlock}>
        <legend className={style.catalogFlterBlockTitle}>Количество струн</legend>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="4-strings" name="4-strings"  />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="6-strings" name="6-strings"  />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className={style.formCheckbox}>
          <input className={style.visuallyHidden} type="checkbox" id="12-strings" name="12-strings" disabled />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className={style.resetButton} type="reset">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
