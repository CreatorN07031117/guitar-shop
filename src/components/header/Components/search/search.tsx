import {useState, useEffect, useRef, ChangeEvent, MouseEvent, FocusEvent} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import {APIRoute} from '../../../../const';
import {Guitars} from '../../../../types/data-types';
import style from './search.module.css';
import '../../../app/app.module.css';


function Search(): JSX.Element {
  const location = useLocation();
  const [searchPhrace, setSearchPhrace] = useState (
    {
      search: '',
      result: [] as Guitars,
    },
  );

  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    axios
      .get(`https://guitar-shop.accelerator.pages.academy${APIRoute.Search}${searchPhrace.search}`)
      .then((resp) => {
        setSearchPhrace((prevSearchPhrace) => ({...prevSearchPhrace, result: resp.data}));
      });
  }, [searchPhrace.search]);

  useEffect(() => {
    setSearchPhrace((prevSearchPhrace) => ({...prevSearchPhrace, search: '', result: []}));
  },[location.pathname]);


  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setSearchPhrace((prevSearchPhrace) => ({...prevSearchPhrace, search: value}));
  };

  const handleCloseClick = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setSearchPhrace((prevSearchPhrace) => ({...prevSearchPhrace, search: ''}));
  };

  const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
    setTimeout( () => setSearchPhrace((prevSearchPhrace) => ({...prevSearchPhrace, search: ''})), 500);
  };


  return (
    <div className={style.formSearch} >
      <form className={style.formSearchForm} id="form-search">
        <button className={style.formSearchSubmit} type="submit">
          <svg className={style.formSearchIcon} width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className={style.visuallyHidden}>Начать поиск</span>
        </button>
        <input
          className={style.formSearchInput}
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={searchPhrace.search}
          data-testid="search"
          ref={searchRef}
          onChange={handleSearchChange}
          onBlur={handleBlur}
        />
        <label className={style.visuallyHidden} htmlFor="search">Поиск</label>
      </form>
      {searchPhrace.search !== '' &&
        (
          <ul className={style.formSearchSelectList}>
            {searchPhrace.result.length === 0?
              (<li className={style.formSearchSelectItem} tabIndex={0}>Ничего не нашлось</li>) :
              searchPhrace.result.map((item) => (
                <li key={item.id} className={style.formSearchSelectItem} tabIndex={0}>
                  <Link to={`/guitars/${item.id}`}>{item.name}</Link>
                </li>
              ))}
          </ul>
        )}
      {searchPhrace.search !== '' &&
        (
          <button
            className={style.formSearchReset}
            type="reset"
            form="form-search"
            onClick={(evt) => handleCloseClick(evt)}
          >
            <svg className={style.formSearchIcon} width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className={style.visuallyHidden}>Сбросить поиск</span>
          </button>
        )}
    </div>
  );
}

export default Search;
