import {ChangeEvent, useEffect, useState, FocusEvent} from 'react';
import {useSearchParams, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {fetchFilterGuitars, fetchGuitarsActions} from '../../../../store/api-actions';
import {useAppSelector} from '../../../../hooks/use-app-selector';
import {useAppDispatch} from '../../../../hooks/use-app-dispatch';
import {loadFilters, getCurrantPage} from '../../../../store/catalog-process/catalog-process';
import {getFetchString, getArrayFromQueryString} from '../../../../utils';
import style from './catalog-filter.module.css';
import '../../../app/app.module.css';


type PriceRange = {
  minPrice: null | number,
  maxPrice: null | number,
}

function CatalogFilter(): JSX.Element {
  const [, setFilterParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState <PriceRange> ({
    minPrice: null,
    maxPrice: null,
  });

  const location = useLocation();
  const {filters, sort, priceMin, priceMax} = useAppSelector(({CATALOG}) => CATALOG);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(location.search !== ''){
      dispatch(fetchFilterGuitars(location.search));
    }

    const paramsUrl = getArrayFromQueryString(location.search);

    const filtersFromUrl = {
      isFiltered: false,
      priceGte: 0,
      priceLte: 0,
      acoustic: false,
      electric: false,
      ukulele: false,
      fourStrings: false,
      sixStrings: false,
      sevenStrings: false,
      twelveStrings: false,
    };

    if(paramsUrl.priceGte){
      const minPrice = Number(paramsUrl.priceGte);

      filtersFromUrl.priceGte = minPrice;
      setPriceRange((prevPriceRange) => ({...prevPriceRange, minPrice: minPrice}));
    }
    if(paramsUrl.priceLte){
      let maxPrice = Number(paramsUrl.priceLte);
      if(maxPrice < Number(paramsUrl.priceGte)){
        maxPrice = Number(paramsUrl.priceGte);
      }

      filtersFromUrl.priceLte = maxPrice;
      setPriceRange((prevPriceRange) => ({...prevPriceRange, maxPrice: maxPrice}));
    }
    if(paramsUrl.type){
      paramsUrl.type.map((item) => {
        switch (item) {
          case 'acoustic':
            return filtersFromUrl.acoustic = true;
            break;
          case 'electric':
            return filtersFromUrl.electric = true;
            break;
          default:
            return filtersFromUrl.ukulele = true;
            break;
        }
      });
    }
    if(paramsUrl.stringsCount){
      paramsUrl.stringsCount.map((item) => {
        switch (item) {
          case '4':
            return filtersFromUrl.fourStrings = true;
            break;
          case '6':
            return filtersFromUrl.sixStrings = true;
            break;
          case '7':
            return filtersFromUrl.sevenStrings = true;
            break;
          default:
            return filtersFromUrl.twelveStrings= true;
            break;
        }
      });
    }

    dispatch(loadFilters(filtersFromUrl));

  }, [dispatch, location.search]);


  const priceChangeHandle = (evt: FocusEvent<HTMLInputElement>) => {
    const {name, value, id} = evt.target;
    let price = value;

    if(Number(value) === 0){
      return toast.error('???????? ???? ?????????? ???????? ?????????? ????????');
    }
    if(id === 'minPrice' && priceRange.maxPrice !== null && Number(value) > priceRange.maxPrice){
      return toast.error('?????????????????????? ???????? ???????? ????????????????????????');
    }
    if(id === 'minPrice' && Number(value) < priceMin){
      price = String(priceMin);
    }if(id === 'minPrice' && Number(value) > priceMax){
      price = String(priceMax);
    }
    if(id === 'maxPrice' && Number(value) < priceMin){
      price = String(priceMin);
    }
    if(id === 'maxPrice' && Number(value) > priceMax){
      price = String(priceMax);
    }
    if(Number(value) !== 0 && value[0] === '0'){
      price = value.slice(1);
    }

    const newFilters = {...filters, [name]: price};
    setPriceRange((prewPriceRange) => ({...prewPriceRange, [id]: price}));
    dispatch(loadFilters(newFilters));
    const response = getFetchString(newFilters, sort);
    setFilterParams(response);
  };

  const changeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;

    const newFilters = {...filters, [name]: checked};
    dispatch(getCurrantPage(1));
    dispatch(loadFilters(newFilters));
    const response = getFetchString(newFilters, sort);
    setFilterParams(response);
  };

  const clearFiltersHandle = () => {
    dispatch(loadFilters({
      priceGte: 0,
      priceLte: 0,
      acoustic: false,
      electric: false,
      ukulele: false,
      fourStrings: false,
      sixStrings: false,
      sevenStrings: false,
      twelveStrings: false,
    }));
    setPriceRange((prevPriceRange) => ({...prevPriceRange, minPrice: null, maxPrice: null}));
    setFilterParams('');
    dispatch(fetchGuitarsActions());
  };

  const getDisabled = (id: string) => {
    if(filters.acoustic || filters.electric || filters.ukulele){
      switch (id) {
        case '4-strings':
          return !(filters.ukulele || filters.electric);
          break;
        case '6-strings':
          return !(filters.electric || filters.acoustic);
          break;
        case '7-strings':
          return !(filters.electric || filters.acoustic);
          break;
        default:
          return !filters.acoustic;
          break;
      }
    }
  };

  const getDisabledType = (id: string) => {
    if(filters.fourStrings || filters.sixStrings || filters.sevenStrings || filters.twelveStrings){
      switch (id) {
        case 'acoustic':
          return !(filters.twelveStrings || filters.sixStrings || filters.sevenStrings);
          break;
        case 'electric':
          return !(filters.sixStrings || filters.sevenStrings || filters.fourStrings);
          break;
        default:
          return !filters.fourStrings ;
          break;
      }
    }
  };

  return (
    <form className={style.catalogFilter}>
      <h2 className={style.catalogFilterTitle}>????????????</h2>
      <fieldset className={style.catalogFilterBlock}>
        <legend className={style.catalogFlterBlockTitle}>????????, ???</legend>
        <div className={style.catalogFilterPriceRange}>
          <div className={style.formInput}>
            <label className={style.visuallyHidden}>?????????????????????? ????????</label>
            <input
              type="number"
              placeholder={`${priceMin.toLocaleString()}`}
              id="minPrice"
              name="priceGte"
              data-testid="pricemin"
              value={priceRange.minPrice as number}
              onChange={(evt) => {
                setPriceRange((prev) => ({...prev, minPrice: Number(evt.target.value)}));
              }}
              onBlur={priceChangeHandle}
            />
          </div>
          <div className={style.formInput}>
            <label className={style.visuallyHidden}>???????????????????????? ????????</label>
            <input
              type="number"
              placeholder={`${priceMax.toLocaleString()}`}
              id="maxPrice"
              name="priceLte"
              data-testid="pricemax"
              value={priceRange.maxPrice as number}
              onChange={(evt) => {
                setPriceRange((prev) => ({...prev, maxPrice: Number(evt.target.value)}));
              }}
              onBlur={priceChangeHandle}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className={style.catalogFilterBlock}>
        <legend className={style.catalogFlterBlockTitle}>?????? ??????????</legend>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="acoustic"
            name="acoustic"
            data-testid="testtype"
            disabled={getDisabledType('acoustic')}
            checked={filters.acoustic}
            onChange={changeHandle}
          />
          <label htmlFor="acoustic">???????????????????????? ????????????</label>
        </div>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="electric"
            name="electric"
            disabled={getDisabledType('electric')}
            checked={filters.electric}
            onChange={changeHandle}
          />
          <label htmlFor="electric">??????????????????????????</label>
        </div>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="ukulele"
            name="ukulele"
            disabled={getDisabledType('ukulele')}
            checked={filters.ukulele}
            onChange={changeHandle}
          />
          <label htmlFor="ukulele">??????????????</label>
        </div>
      </fieldset>
      <fieldset className={style.catalogFilterBlock}>
        <legend className={style.catalogFlterBlockTitle}>???????????????????? ??????????</legend>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="4-strings"
            name="fourStrings"
            disabled={getDisabled('4-strings')}
            checked={filters.fourStrings}
            onChange={changeHandle}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="6-strings"
            name="sixStrings"
            disabled={getDisabled('6-strings')}
            checked={filters.sixStrings}
            onChange={changeHandle}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="7-strings"
            name="sevenStrings"
            disabled={getDisabled('7-strings')}
            checked={filters.sevenStrings}
            onChange={changeHandle}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className={style.formCheckbox}>
          <input
            className={style.visuallyHidden}
            type="checkbox"
            id="12-strings"
            name="twelveStrings"
            disabled={getDisabled('12-strings')}
            checked={filters.twelveStrings}
            onChange={changeHandle}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className={style.resetButton}
        type="reset"
        onClick={clearFiltersHandle}
      >
        ????????????????
      </button>
    </form>
  );
}

export default CatalogFilter;
