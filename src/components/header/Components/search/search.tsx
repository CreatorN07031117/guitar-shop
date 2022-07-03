import {useState, useEffect, useRef, ChangeEvent, MouseEvent, FocusEvent, useCallback} from 'react';
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

  const listRef = useRef<HTMLUListElement | null>(null);

  const [activeId, setActiveId] = useState ({
    id: 0,
  });

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

  const handleClickOnArrow = useCallback((evt) => {
    if (evt.keyCode === 40 || evt.keyCode === 38) {
      const activeElementID = activeId.id;
      if (evt.keyCode === 40){
        setActiveId((prevState) => ({...prevState, id:  (activeElementID - 1)}));
      }
      if (evt.keyCode === 38){
        setActiveId((prevState) => ({...prevState, id:  (activeElementID + 1)}));
      }
    }
  }, [activeId.id]);

  useEffect(() => {
    document.addEventListener('keydown', handleClickOnArrow);
  }, [handleClickOnArrow]);

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
          role="combobox"
          aria-expanded
          aria-activedescendant={`#${activeId.id}`}
          aria-controls="search-list"
          aria-owns="search-list"
          onBlur={handleBlur}
        />
        <label className={style.visuallyHidden} htmlFor="search">Поиск</label>
      </form>
      {searchPhrace.search !== '' &&
        (
          <ul className={style.formSearchSelectList} id="search-list" role="listbox" ref={listRef} unselectable="on" tabIndex={0}>
            {searchPhrace.result.length === 0?
              (<li className={style.formSearchSelectItem} tabIndex={0}>Ничего не нашлось</li>) :
              searchPhrace.result.map((item, id) => (
                <li key={item.id} className={style.formSearchSelectItem} id={`${id}`} role="option" aria-selected={id===activeId.id}  tabIndex={-1}>
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
