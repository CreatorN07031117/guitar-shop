import {RATING_STARS, TextRating} from './const';
import {Comment, SortType} from './types/data-types';


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

export function getQueryStringFromObject (sort: SortType) {
  return new URLSearchParams(sort).toString();
}

export function getObjectFromQueryString (search: string) {
  const paramsEntries = new URLSearchParams(search).entries();

  return Object.fromEntries(paramsEntries);
}
