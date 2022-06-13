import {useMemo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getObjectFromQueryString, getQueryStringFromObject} from '../utils';

type useSortQueryTypes<T> = [
  T,
  (fieldName: string) => (value: string) => void,
  (fieldName: string) => () => void
];


export function useSortQuery <T extends object> (
  getSortQuery?: (query: string) => T,
  getSearchQuery?: (sort: T) => string,
): useSortQueryTypes<T> {
  const {search} = useLocation();
  const navigate = useNavigate();

  const sort = useMemo(() => (getSortQuery ? getSortQuery(search) : getObjectFromQueryString(search)),
    [search, getSortQuery],
  );

  const setSearchQuery = useCallback((sort: T) => {
    const search = getSearchQuery
      ? getSearchQuery(sort)
      : getQueryStringFromObject(sort).toString();

    navigate({search}, {replace: true});
  },
  [navigate, getSearchQuery],
  );

  const сhangeSort = useCallback((fieldName: string) => (value: string) => {
    const newSort = { ...sort, [fieldName]: value };

    setSearchQuery(newSort);
  },
  [sort, setSearchQuery],
  );

  return [sort, сhangeSort];
}
