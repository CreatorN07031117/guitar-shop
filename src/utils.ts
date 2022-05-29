import { RATING_STARS } from './const';
import { Comment, Comments } from './types/data-types';

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
};
