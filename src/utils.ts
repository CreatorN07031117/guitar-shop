import {toast} from 'react-toastify';
import {RATING_STARS, TextRating, FiltersParam, SortParam, HTTPCode} from './const';
import {Comment } from './types/data-types';
import {Filter, Sort} from './types/store-types';

export function getRetinaImg (img: string) {
  return img.slice(0, -4).concat('@2x.jpg 2x');
}

export function getRatingStars (rating: number) {
  const stars = [];

  for(let i = 0; i < RATING_STARS; i=i+1){
    if(i < rating){
      stars.push('#icon-full-star');} else {
      stars.push('#icon-star');}
  }

  return stars;
}

export function sortCommentsByData (a:Comment, b:Comment) {
  const A = Number(new Date(a.createAt));
  const B = Number(new Date(b.createAt));
  return (B - A);
}

export function generateUid() {
  return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,'');
}

export function spotRating (rate: number) {
  let textRating;

  switch (rate) {
    case 1:
      textRating = TextRating.Terrible;
      break;
    case 2:
      textRating = TextRating.Poorly;
      break;
    case 3:
      textRating = TextRating.Fine;
      break;
    case 4:
      textRating = TextRating.Good;
      break;
    default:
      textRating = TextRating.Great;
      break;
  }

  return textRating;
}

export function getQueryStringFromObject (filter: string) {
  return new URLSearchParams(filter).toString();
}

export function getArrayFromQueryString (search: string) {
  const paramsEntries = new URLSearchParams(search).entries();
  const pairParams = {
    sortType: '',
    orderMethod: '',
    priceLte: '',
    priceGte: '',
    type: [] as string [],
    stringsCount: [] as string [],
  };

  for(const pair of paramsEntries) {
    switch (pair[0]) {
      case '_sort':
        pairParams.sortType = pair[1];
        break;
      case '_order':
        pairParams.orderMethod = pair[1];
        break;
      case 'price_gte':
        pairParams.priceGte = pair[1];
        break;
      case 'price_lte':
        pairParams.priceLte = pair[1];
        break;
      case 'type':
        pairParams.type.push(pair[1]);
        break;
      default:
        pairParams.stringsCount.push(pair[1]);
        break;
    }
  }

  return pairParams;
}


export function getFetchString (filter: Filter, sort: Sort) {
  let response = '';

  if(filter.priceGte > 0){
    response = response.concat(`&${FiltersParam.PriceGte}${filter.priceGte}`);
  }
  if(filter.priceLte > 0){
    response = response.concat(`&${FiltersParam.PriceLte}${filter.priceLte}`);
  }
  if(filter.acoustic){
    response = response.concat(`&${FiltersParam.Acoustic}`);
  }
  if(filter.electric){
    response = response.concat(`&${FiltersParam.Electric}`);
  }
  if(filter.ukulele){
    response = response.concat(`&${FiltersParam.Ukulele}`);
  }
  if(filter.fourStrings){
    response = response.concat(`&${FiltersParam.FourStrings}`);
  }
  if(filter.sixStrings){
    response = response.concat(`&${FiltersParam.SixStrings}`);
  }
  if(filter.sevenStrings){
    response = response.concat(`&${FiltersParam.SevenStrings}`);
  }
  if(filter.twelveStrings){
    response = response.concat(`&${FiltersParam.TwelveStrings}`);
  }
  if(sort.sortType !== '' && sort.orderMethod !== ''){
    response = response.concat(`&${SortParam.Sort}${sort.sortType}`, `&${SortParam.Order}${sort.orderMethod}`);
  }

  return  response.replace('&','?');
}


export function pushSereverResponse (response: number) {
  switch (response) {
    case HTTPCode.NotFound:
      toast.error('Неверный запрос');
      break;
    case HTTPCode.BadGateway:
      toast.error('Сервер не отвечает');
      break;
    default:
      toast.success('Данные успешно загружены');
      break;
  }
}
